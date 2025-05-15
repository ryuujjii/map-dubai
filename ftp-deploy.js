import ftp from 'basic-ftp';
import path from 'path';
import fs from 'fs';

async function deploy() {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        await client.access({
            host: 'ip.address',
            user: 'ftp-username',
            password: 'ftp-username-password',
            secure: true,
        });
        const __root = import.meta.dirname;

        const localDir = path.join(__root, 'build');
        const remoteDir = '/';

        console.log(`Uploading files from ${localDir} to ${remoteDir}`);

        await client.ensureDir(remoteDir);
        await client.clearWorkingDir(); // Clear remote directory before uploading
        await uploadDirectory(client, localDir, remoteDir);

        console.log('FTP deployment completed successfully!');
    } catch (err) {
        console.error('FTP deployment failed:', err);
    } finally {
        client.close();
    }
}

async function uploadDirectory(client, localDir, remoteDir) {
    const files = fs.readdirSync(localDir);

    for (const file of files) {
        const localPath = path.join(localDir, file);
        const remotePath = `${remoteDir}/${file}`;

        if (fs.lstatSync(localPath).isDirectory()) {
            await client.ensureDir(remotePath);
            await uploadDirectory(client, localPath, remotePath);
        } else {
            console.log(`Uploading ${localPath} to ${remotePath}`);
            await client.uploadFrom(localPath, remotePath);
        }
    }
}

deploy();
