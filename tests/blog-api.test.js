const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/config/prisma');

let token;
let blogId;

jest.setTimeout(20000); // Allow time for Supabase connection and async DB operations

/**
 * Clears all related tables before any tests run.
 */
beforeAll(async () => {
    try {
        await prisma.postMedia.deleteMany();
        await prisma.comment.deleteMany();
        await prisma.postLike.deleteMany();
        await prisma.savedPost.deleteMany();
        await prisma.blogPost.deleteMany();
        await prisma.user.deleteMany();
    } catch (err) {
        console.error('Error during beforeAll DB cleanup:', err);
    }
});

/**
 * Disconnect Prisma client after all tests finish.
 */
afterAll(async () => {
    await prisma.$disconnect();
});

/**
 * Tests for user registration and login flow.
 */
describe('Auth - Register & Login', () => {
    test('Should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                full_name: 'Test User',
                email: 'test@example.com',
                password: 'testpass123',
                profile_pic: 'iVBORw0KGgoAAAANSUhEUgAAAAUA'
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.user).toHaveProperty('id');
    });

    test('Should log in and return a JWT token', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'testpass123'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token;
    });
});

/**
 * Tests for blog post creation, validation, retrieval, and update.
 */
describe('Blog - Create, Validate, Get, Update', () => {
    test('Should create a new blog post with media', async () => {
        const res = await request(app)
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Blog Post',
                content: 'This is a valid blog post content.',
                category: 'Coding',
                is_public: true,
                media: [
                    {
                        media_data: 'iVBORw0KGgoAAAANSUhEUgAAAAUA',
                        media_type: 'image/png'
                    }
                ]
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        blogId = res.body.id;
    });

    test('Should return 400 for invalid category', async () => {
        const res = await request(app)
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Invalid Blog',
                content: 'Valid content',
                category: 'Food' // Not in enum
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toMatch(/must be one of/);
    });

    test('Should return all blogs', async () => {
        const res = await request(app).get('/api/blogs');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    test('Should update a blog post by ID', async () => {
        const res = await request(app)
            .put(`/api/blogs/${blogId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Updated Blog Title',
                content: 'Updated content for the blog',
                category: 'Technology',
                is_public: false
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe('Updated Blog Title');
        expect(res.body.category).toBe('Technology');
    });
});

/**
 * Comment functionality tests:
 * - Add a comment to a blog post
 * - Update that comment
 */
describe('Comment - Add and Update', () => {
    let commentId;

    test('Should add a comment to a blog post', async () => {
        const res = await request(app)
            .post(`/api/comments/${blogId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                content: 'This is a comment on the blog post.'
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.content).toBe('This is a comment on the blog post.');
        commentId = res.body.id;
    });

    test('Should update the comment content', async () => {
        const res = await request(app)
            .put(`/api/comments/${commentId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                content: 'This comment has been updated.'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.content).toBe('This comment has been updated.');
    });
});

/**
 * Tests for likes and saved post.
 */
describe('Post interactions - Likes and Saves', () => {
    test('Should toggle like on a blog post', async () => {
        const res = await request(app)
            .post(`/api/likes/${blogId}/toggle`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('liked');
    });

    test('Should toggle save on a blog post', async () => {
        const res = await request(app)
            .post(`/api/saves/${blogId}/toggle`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('saved');
    });
});

