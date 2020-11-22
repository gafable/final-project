const layout = 'layouts/admin'
async function daily(resquest, response) {
    response.render('admin/reports/daily', {
        layout: layout
    })
}

async function monthly(request, response) {
    response.render('admin/reports/monthly', {
        layout: layout
    })
}


async function annual(request, response) {
    response.render('admin/reports/annual', {
        layout: layout
    })
}


async function electric(request, response) {
    response.render('admin/reports/electricBill', {
        layout: layout
    })
}

async function water(request, response) {
    response.render('admin/reports/waterBill', {
        layout: layout
    })

}

module.exports = {
    daily,
    monthly,
    annual,
    electric,
    water
}