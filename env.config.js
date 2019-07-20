const prod= process.env.NODE_ENV==='production'

module.exports={
    'process.env.BASE_URL':prod?'https://nicolastorres.herokuapp.com':'http://localhost:3000',
    'process.env.NAMESPACE':'https://nicolastorres.herokuapp.com',
    'process.env.CLIENT_ID':'SBe4dxaK317aYsr9HKbC1XIb0X80V6gn'
}