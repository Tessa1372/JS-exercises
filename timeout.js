async function callMe() {
    const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true;
            if (success) {
                resolve("Successful");
            } else {
                reject("Wrong");
            }
        }, 3000);
    });

    try {
        const res = await myPromise;
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}
