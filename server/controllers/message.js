const Message = require('../models/messages')


module.exports.addMessage = async(req, res, next)=>
{
    try 
    {
        console.log("inside");
        const {from, to, message} = req.body;
        const data = await new Message({message: {text: message}, users:[from, to], sender: from});
        await data.save();

        if(data)
        {
            return res.json({msg: "Message added succesfully", status: true});
        }
        return res.json({msg: "Failed to add msg to db", status: false});
    }   

    catch (error)
    {
        next(error);    
    }
}

module.exports.getAllMessages = async(req, res, next)=>
{
    try 
    {
        const {from , to} = req.body;
        const messages = await Message.find({
            users: {
                $all: [from, to]
            },
        }).sort({updatedAt: 1});
        
        const showMessages = messages.map((msg)=>
        {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text
            };
        })

        res.json({showMessages})
    }   
    catch (error)
    {
        next(error);    
    }

}
