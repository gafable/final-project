const layout = 'layouts/admin'
async function daily(resquest, response) {
    response.render('admin/reports/daily', {
        layout: layout,
        header: 'Daily Report'
    })
}

async function monthly(request, response) {
    response.render('admin/reports/monthly', {
        layout: layout,
        header: 'Monthly Report'
    })
}


async function annual(request, response) {
    response.render('admin/reports/annual', {
        layout: layout,
        header: 'Annual Report'
    })
}


async function electric(request, response) {
    response.render('admin/reports/electricBill', {
        layout: layout,
        header: 'Electric Bill Report'
    })
}

async function water(request, response) {
    response.render('admin/reports/waterBill', {
        layout: layout,
        header: 'Water Bill Report'
    })

}

module.exports = {
    daily,
    monthly,
    annual,
    electric,
    water
}