const dev = process.env.NODE_ENV === "development";

const path = dev ? "testcore" : "core";

export default path;
