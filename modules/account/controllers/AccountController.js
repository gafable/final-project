const Account = require('./../models/Account')
const parseRequestBody = require('./../../../utilities/parseRequestBody');
const AccountInfo = require('../models/AccountInfo');
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
        console.log(error);
    }
}
async function createProfile(request, response) {
    try {

        console.log(request.body);
        const profile = {
            firstname: request.body.firstname,
            lasttname: request.body.lasttname,
            firstname: request.body.firstname,
            middlename: request.body.middlename,
            birthday: request.body.birthday,
            age: request.body.age,
            address: request.body.address,
            account: request.user._id
        }
        await
        await Account.findOne({ _id: request.user._id }, (error, account) => {
            new AccountInfo(profile).save((err, accountInfo) => {
                if (err) {
                    console.log(err);
                    return response.render('pages/client-profile', {
                        layout: 'layouts/client',
                        header: 'Profile info '
                    })

                }
                account.accountInfo = account
                account.save()

                response.redirect('/')
            })
        })

    } catch (error) {
        console.log(error);
    }
}


async function update(request, response) {

    const accountToUpdate = parseRequestBody(request.body)
    await Account.findOneAndUpdate({ _id: request.params.id }, accountToUpdate, (error, result) => {
        if (error) {
            response.render('/accounts/profile', {
                layout: layout,
                header: 'Update Account',
                account: new Account(),
                error: error
            })
        }
        response.redirect('/')
    })

}


async function destroy(request, response) {

}
async function profile(request, response) {
    await Account.findOne({ _id: request.user._id }).populate('accountInfo').exec((error, account) => {
        if (error) {
            return response.redirect('back')
        }
        console.log(account.accountInfo);

        response.render('pages/client-profile', {
            layout: 'layouts/client',
            header: 'Profile info ',
            title: 'Account Profile',
            account: account

        })
    })

}

async function clients(request, response) {
    try {
        await Account.find({ accountType: "client" }).populate('bookings').exec((error, accounts) => {
            if (error) return response.redirect('back')
            response.render('admin/accounts/clients', {
                layout: 'layouts/admin',
                header: 'Clients',
                title: 'Clients List',
                accounts: accounts
            })
        })
    } catch (error) {
        console.log(error);
        response.redirect('back')
    }


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
    employees,
    profile,
    createProfile
}