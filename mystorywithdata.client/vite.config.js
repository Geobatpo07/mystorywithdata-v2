import { fileURLToPath, URL } from 'node:url';
import path from 'path';
import fs from 'fs';
import child_process from 'child_process';
import { env } from 'process';
import { defineConfig } from 'vite';
import reactPlugin from '@vitejs/plugin-react';

// Émulation de __dirname dans ESModule
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseFolder =
    env.APPDATA !== undefined && env.APPDATA !== ''
        ? `${env.APPDATA}/ASP.NET/https`
        : `${env.HOME}/.aspnet/https`;

const certificateName = 'mystorywithdata.client';
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(baseFolder)) {
    fs.mkdirSync(baseFolder, { recursive: true });
}

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    if (
        0 !==
        child_process.spawnSync(
            'dotnet',
            ['dev-certs', 'https', '--export-path', certFilePath, '--format', 'Pem', '--no-password'],
            { stdio: 'inherit' }
        ).status
    ) {
        throw new Error('Could not create certificate.');
    }
}

const target = env.ASPNETCORE_HTTPS_PORT
    ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
    : env.ASPNETCORE_URLS
        ? env.ASPNETCORE_URLS.split(';')[0]
        : 'https://localhost:7203';

export default defineConfig({
    plugins: [reactPlugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        proxy: {
            '^/weatherforecast': {
                target,
                secure: false,
            },
        },
        port: parseInt(env.DEV_SERVER_PORT || '58345'),
        https: {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        },
        fs: {
            allow: [
                path.resolve(__dirname),        // racine client
                path.resolve(__dirname, '../'), // racine repo (pour node_modules)
            ],
        },
    },
});
