self.onmessage = () => {
    let t = 0;
    for (let i = 0; i < 1e9; i++) {
        t += i;
    }
    postMessage(t);
};

export {};
