import { PrismaClient } from "@prisma/client";
import type { RequestHandler } from "@sveltejs/kit";
import Redis from "ioredis";
import 'dotenv/config';

const prisma = new PrismaClient();

const redis = new Redis(process.env.REDIS_URL || 'redis://default:QipcEyEaCODJMfmyyNRvyHPrrLPrkNoi@ballast.proxy.rlwy.net:11647');

const CACHE_EXPIRATION = 5 * 60; 


export const GET: RequestHandler = async () => {
  try {
    const cachedTasks = await redis.get('tasks');

    if (cachedTasks) {
      return new Response(cachedTasks, {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const tasks = await prisma.task.findMany();
    await redis.set('tasks', JSON.stringify(tasks), 'EX', CACHE_EXPIRATION);
    return new Response(JSON.stringify(tasks), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);

    return new Response('Error fetching tasks', {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};


export const POST: RequestHandler = async ({ request }) => {
    const { title, description, priority, status } = await request.json();
    const newTask = await prisma.task.create({
      data: { title, description, priority, status },
    });
    await redis.del('tasks');
    return new Response(JSON.stringify(newTask), {
      headers: { 'Content-Type': 'application/json' },
    });
  };


export const PUT: RequestHandler = async ({ request }) => {
    const { id, title, description, priority, status } = await request.json();
    const updatedTask = await prisma.task.update({
        where: { id },
        data: { title, description, priority, status },
      });
      await redis.del('tasks');
      return new Response(JSON.stringify(updatedTask), {
        headers: { 'Content-Type': 'application/json' },
      });
};

export const DELETE: RequestHandler = async ({ request }) => {
    const { id } = await request.json();
    await prisma.task.delete({
        where: { id },
      });
      await redis.del('tasks');
      return new Response(null, { status: 204 });
}

