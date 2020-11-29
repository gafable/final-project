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
                classTypes: result
            })
        })
    } catch (error) {
        console.log(error);
        response.redirect('back')
    }


}

async function store(request, response) {
    console.log(request.file);
    const classType = {
        name: request.body.name,
        type: request.body.type,
        imageUrl: request.file.destination + '/' + request.file.filename,
        price: request.body.price,
        description: request.body.description,
        features: request.body.features
    }
    await new ClassType(classType).save().then((classType) => {
        console.log(classType);
        response.redirect('/classtypes')
    }).catch((error) => {
        console.log(error);
    })
}

async function edit(request, response) {
    await ClassType.findOne({ _id: request.params.id }, (error, result) => {
        if (error) {
            return response.render('admin/classTypes/', {
                layout: layout,
                header: 'Update Class Type',
                errors: error
            })
        }
        console.log(result);
        response.render('admin/classTypes/update', {
            layout: 'layouts/admin',
            header: 'Update Class Type',
            classType: result
        })
    })
}
async function update(request, response) {
    const roomToUpdate = parseRequestBody(request.body)
    await ClassType.updateOne({ _id: request.body.id }, roomToUpdate, (error, result) => {
        if (error) {
            response.render('admin/classtypes/update', {
                layout: layout,
                header: 'Update Room',
                room: new Room(),
                error: error
            })
        }
        response.redirect('/classtypes')
    })
}

async function destroy(request, response) {

}

async function classTypes(request, response) {
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
        console.log(error);
        response.ridirect('back')
    }
}

module.exports = {
    index,
    store,
    edit,
    update,
    destroy,
    classTypes
}