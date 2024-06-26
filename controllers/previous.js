async function showRequests(req, res){
    try{
        console.log("show all req")
    }
    catch (error){
        res.json(error)
    }
}

module.exports = {showRequests};