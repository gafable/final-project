const ClassType = require('./../models/ClassType')

const parseRequestBody = require('./../utilities/parseRequestBody')
async function index(request, response) {
    try {
        await ClassType.find({}, (error, result) => {
            if (error) {
                return response.status(500).redirect('back')
            }
            response.render('admin/classTypes/index', {
                layout: 'layouts/admin',
                title: 'Class Type',
                header: 'Class Types',
                classTypes: result,
                user: request.user
            })
        })
    } catch (error) {
        response.redirect('back')
    }


}

async function store(request, response) {
    try {
        const classType = {
            name: request.body.name,
            type: request.body.type,
            capacity: request.body.capacity,
            imageUrl: '/' + request.file.destination + '/' + request.file.filename,
            price: request.body.price,
            description: request.body.description,
            features: request.body.features
        }
        await new ClassType(classType).save().then((classType) => {
            response.redirect('/classtypes')
        }).catch((error) => {
            return response.status(500).json({
                error: error
            })
        })
    } catch (error) {
        return response.redirect('back')
    }

}

async function show(request, response) {
    try {
        await ClassType.findOne({ _id: request.params.id }, (error, classType) => {
            if (error) return response.status(500).json({
                message: "Server Error"
            })
            response.status(200).json({
                classType: classType
            })
        })
    } catch (error) {
        response.status(500).json({
            message: "Server Error"
        })
    }

}

async function edit(request, response) {
    try {
        await ClassType.findOne({ _id: request.params.id }, (error, result) => {
            if (error) {
                return response.redirect('back')
            }
            response.render('admin/classTypes/update', {
                layout: 'layouts/admin',
                header: 'Update Class Type',
                classType: result,
                user: request.user
            })
        })
    } catch (error) {
        return response.redirect('back')
    }

}
async function update(request, response) {
    try {
        const roomToUpdate = parseRequestBody(request.body)
        await ClassType.updateOne({ _id: request.body.id }, roomToUpdate, (error, result) => {
            if (error) {
                return response.redirect('back')
            }
            response.redirect('/classtypes')
        })
    } catch (error) {
        return response.redirect('back')
    }

}

async function destroy(request, response) {
    try {
        await ClassType.deleteOne({_id : request.params.id},(error,result)=>{
            if(error){
                return response.redirect('back')
            }
            response.redirect('/classtypes')
        })
    } catch (error) {
         return response.redirect('back')
    }
}

async function all(request, response) {
    try {
        await ClassType.find({}, (error, result) => {
            if (error) {
                return response.status(500).json({
                    error: error
                })
            }
            response.status(200).json({
                classTypes: result
            })
        });
    } catch (error) {
        response.ridirect('back')
    }
}

module.exports = {
    index,
    store,
    edit,
    update,
    destroy,
    all,
    show
}