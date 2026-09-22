import {OpenAPIHono} from '@hono/zod-openapi';
import {cors} from 'hono/cors';
import type {Env} from "./types";
import repo from './routes/github/repo';
import user from './routes/github/user';
import {API_DOCS_URL} from "./utils";

const app = new OpenAPIHono<{ Bindings: Env }>();

app.use('*', cors({
    origin: '*',
}))

app.get('/', (c) => c.html(`Hellow, visit <a href="${API_DOCS_URL}">here</a> for API documentation.`))

app.route('/github/repo', repo)
app.route('/github/user', user)

app.doc("/openapi", {
    openapi: "3.0.0",
    info: {title: "PinStack API", version: "1.0.0"},
    tags: [
        {
            name: 'github',
            'x-displayName': 'GitHub',
            description: 'PinStack generates beautiful, embeddable SVG cards for dev platforms like GitHub.'
        },
    ],
    servers: [
        {
            url: "https://pinstack.matheesha.workers.dev",
            description: "Production"
        }
    ]
})

export default app