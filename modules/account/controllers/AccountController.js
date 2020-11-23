const Account = require('./../models/Account')
async function index(request, response) {

}
async function show(request, response) {

}

async function store(request, response) {
    try {
        console.log(request.body);
        const account = {
            username: request.body.username,
            email: request.body.email,
            password: request.body.password,
            accountType: 'client'
        }
        await new Account(account).save((err, result) => {
            if (err) {
                console.log(err);
                return response.render('auth/register', {
                    error: err,
                    layout: 'layouts/auth'
                })
            }
            response.redirect('/')
        })
    } catch (error) {

    }
}
async function update(request, response) {

}
async function destroy(request, response) {

}

function clients(request, response) {
    response.render('admin/accounts/clients', {
        layout: 'layouts/admin',
        header: 'Clients'
    })
}

function employees(request, response) {
    const employees = [
        { name: "Lorem Zyn", position: "Front Desk Officer" },
        { name: "Ipsum Zyn", position: "Cashier" },
        { name: "John Doe", position: "Manager" },
        { name: "Jolina Dee", position: "Secretary" },
        { name: "Douglas McGee", position: "Treasurer" },
        { name: "Jane Doe", position: "HR Officer" },
        { name: "Hazel Lee", position: "Excecutive Officer" }

    ]
    response.render('admin/accounts/employees', {
        layout: 'layouts/admin',
        header: 'Employees',
        employees: employees
    })
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
    clients,
    employees
}