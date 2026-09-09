import { Hono } from 'hono'
import type { Env } from "./types";
import repo from './routes/github/repo';

const app = new Hono<{ Bindings: Env }>();

app.get('/', (c) => c.text('Hellow world!'))

app.route('/github/repo', repo)

export default app