const projects = require('../Modal/projectModal')

exports.addProjectController = async (req, res) => {

    console.log("inside addProjectController");

    const userId = req.userId
    console.log(userId);

    console.log(req.body);
    console.log(req.file);

    const { title, languages, github, websiteLink, overView } = req.body

    const projectImg = req.file.filename

    try {

        const exisitingProject = await projects.findOne({ github })

        if (exisitingProject) {

            res.status(406).json("project already exists ...Please add another one")
        }
        else {

            const newProject = new projects({ title, languages, github, websiteLink, overView, projectImg, userId })

            await newProject.save()
            res.status(200).json(newProject)
        }

    } catch (err) {
        res.status(401).json(err)

    }






}

exports.getHomeProjectController=async(req,res)=>{
    console.log("inside getHomeProjectController");

    try{

        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)

    }
    catch(err){
        res.status(401).json(err)
    }
    
}

exports.getAllProjectController=async(req,res)=>{
    console.log("inside getAllProjectController");

    const{search}=req.query

    try{
      const query={
        languages:{
           $regex:search,
           $options:"i"
        }
      }


   const allProjects= await projects.find(query)
   res.status(200).json(allProjects)

    }
    catch(err){
        res.status(401).json(err)
    }
    
}

exports.getUserProjectController=async(req,res)=>{
    console.log("inside getUserProjects");
 
    const userId =req.userId
    try{
        const userProject=await projects.find({userId})
        res.status(200).json(userProject)
    }
    catch(err){
        res.status(401).json(err)
    }
    
}

exports.updateProjectController=async(req,res)=>{
    console.log("inside updateProjectController");

    const {pid}=req.params
    const {title,languages,github,websiteLink,overView,projectImg}=req.body
    const uploadImg=req.file?req.file.filename:projectImg

    const userId=req.userId 

    try{
        const updateProject= await projects.findByIdAndUpdate({_id:pid},{title,languages,github,websiteLink,overView,projectImg:uploadImg,userId},{new:true})
        
        await updateProject.save()
        res.status(200).json(updateProject)
    }
    catch(err){
        res.status(401).json(err)
    }
    
}
exports.removeProjectController=async(req,res)=>{

    console.log("inside removeProjectController");

    const {id}=req.params

    try{
        const removedProject= await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removedProject)
        


    }

    catch(err){
        res.status(401).json(err)
    }
    
}