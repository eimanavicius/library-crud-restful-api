import http from './http';

const port: number = parseInt(process.env.PORT || '3000');

http.listen(port, () => console.log(`Listening on port ${port}`))
