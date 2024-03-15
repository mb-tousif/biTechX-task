
const server = () => {
    try {
        console.log(`🗂️ MongoDB Server connected`);
    } catch (error) {
        console.log(error);
    }
}

export default server;