function createRequest(req, res){
    const formData = req.body;
    console.log('Received form data:', formData.schedule);          // returns object
    // console.log('Received form data:', formData.schedule[0]);
    // console.log('Received form data:', formData.schedule[1]);
    res.json({ message: 'Form submitted successfully!', data: formData, success: true });
}

module.exports = {createRequest};