const Queue = require('bee-queue');

const options = {
    redis: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        password: process.env.DB_PASS,
    },
}

const cookQueue = new Queue('cook', options);

cookQueue.process(3, (job, done) => {
    let qty = job.data.qty;
    let cooked = 0;

    setTimeout(() => console.log("Getting the ingredients ready ๐ฅฌ ๐ง ๐ง ๐"), 1000);
    setTimeout(() => {
        console.log(`๐ณ Preparing ${job.data.dish}`);
        job.reportProgress(10);
    }, 1500);

    let timer = setInterval(() => {
        if (cooked < qty) {
            cooked++;
            console.log(`๐ณ Progress: ${cooked}/${qty} ${job.data.dish}`);
            job.reportProgress(((cooked / qty) * 90) + 10);
        } else {
            clearInterval(timer);
            console.log(`๐งพ Order ${job.id}: ${job.data.dish} ready`);
            job.reportProgress(100);
            done();
        }
    }, 4000);
});