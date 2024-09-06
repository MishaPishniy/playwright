const dotenv = require ('dotenv')

function config() {
    console.log('TEST_ENV', process.env.TEST_ENV)
if ( process.env.TEST_ENV === 'QA') 
{
    dotenv.config({ path: './.env.qa'})
}
else if (  process.env.TEST_ENV === 'Stage' ) {
    dotenv.config({ path: './.env.stage'}) }
else {
    throw new Error('Invalid env')
} 
}

module.exports.config = config