const Contacts  = require("../models/contactModel")
//@desc Get all Contacts
//@route /api/contacts
//access private

const asyncHandler = require("express-async-handler")

const getContacts = asyncHandler(async(req,res) =>{
    const contacts = await Contacts.find({user_id:req.user.id})
    res.json(contacts)
})

//@desc Create Contact
//@route /api/contacts
//access private

const createContact = asyncHandler( async (req,res) =>{
    console.log(req.body)
    const {name,email,phone} = req.body
    if(!name || !email || !phone)
    {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const contact = await Contacts.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })
    res.json(contact)
})

//@desc Update Contact
//@route /api/contacts/id
//access private

const updateContact = asyncHandler(async (req,res) =>{
    const contact = await Contacts.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact Not Found")
    }
    if(req.user.id != contact.user_id)
    {
        res.status(401)
        throw new Error("You do not have rights to update this contact")
    }
    const updatedContact = await Contacts.findByIdAndUpdate(
       req.params.id,
       req.body,
       {new:true}
    )
    res.json(updatedContact)
})
//@desc Delete Contact
//@route /api/contacts/id
//access private

const deleteContact = asyncHandler(async (req,res) =>{
    const contact = await Contacts.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact Not Found")
    }
    if(req.user.id != contact.user_id)
    {
        res.status(401)
        throw new Error("You do not have rights to delete this contact")
    }
    await Contacts.findByIdAndDelete(req.params.id)
    res.json({"message":`deleted contact ${req.params.id}`})
})
//@desc Get Contact
//@route /api/contacts/id
//access private

const getContact = asyncHandler(async (req,res) =>{
    const contact = await Contacts.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact Not Found")
    }
    if(req.user.id != contact.user_id)
    {
        res.status(401)
        throw new Error("You do not have rights to fetch this contact")
    }
    res.json(contact)
})

module.exports = {getContacts,createContact,updateContact,deleteContact,getContact}