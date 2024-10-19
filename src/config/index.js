const config = {
    local: {
        /// local environment
        API_URL: 'http://localhost:8000/api/v1',
    },
    test: {
        // test environment
        API_URL: '',
    },
    production: {
        // production environment
        API_URL: 'https://api-finalproject-payroll.onrender.com/api/v1',
    },
}

const nodeEnv = import.meta.env.VITE_NODE_ENV || 'production'
export default config[nodeEnv]