const expressJwt = require('express-jwt');

function authJwt(){
    const secret = process.env.SECRET
    return expressJwt({
        secret,
        algorithms:['HS256'],
        isRevoked: isRevoked
    }).unless({
        path:[
            // { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
            // { url: /\/api\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            // { url: /\/api\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
            // { url: /\/api\/orders(.*)/, methods: ['GET', 'OPTIONS', 'POST'] },
            `${api}/login`,
            `${api}/register`
            // '/api/login'
        ]
    })
}

async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        done(null, true);
    }

    done();
}

module.exports =authJwt