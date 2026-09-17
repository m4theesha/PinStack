import {OpenAPIHono} from '@hono/zod-openapi';
import {cors} from 'hono/cors';
import type {Env} from "./types";
import repo from './routes/github/repo';
import user from './routes/github/user';

const app = new OpenAPIHono<{ Bindings: Env }>();

app.use('*', cors({
    origin: '*',
}))

app.get('/', (c) => c.text('Hellow world!'))

app.route('/github/repo', repo)
app.route('/github/user', user)

app.doc("/openapi-doc", {
    openapi: "3.0.0",
    info: {title: "PinStack API", version: "1.0.0"},
    tags: [
        {
            name: 'Github',
            description: '"description": "Endpoints for generating SVG cards from public GitHub repositories and user profiles."'
        },
    ],
    servers: [
        {
            url: "http://127.0.0.1:8787",
            description: "Development"
        },
        {
            url: "https://pinstack.matheesha.workers.dev",
            description: "Production"
        }
    ]
})

export default app