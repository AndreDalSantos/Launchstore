const Intl = require('intl')

module.exports = {
    date(timestamp) {
        const date = new Date(timestamp)

        // const year = date.getUTCFullYear()
        // const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        // const day = `0${date.getUTCDate()}`.slice(-2)
        // const hour = date.getHours()
        // const minutes = date.getMinutes()

        /* OBS: foi removido o UTC pois o banco de dados já corrige isso. */
        const year = date.getFullYear()
        const month = `0${date.getMonth() + 1}`.slice(-2)
        const day = `0${date.getDate()}`.slice(-2)
        const hour = date.getHours()
        const minutes = date.getMinutes()

        return  {
            day,
            month,
            year,
            hour,
            minutes,
            iso: `${year}-${month}-${day}`,  // tipo iso
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
    },
    formatPrice(price){
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'  // R$
        }).format(price/100)
    },
    formatCpfCnpj(value){
        value = value.replace(/\D/g, '')

        if(value.length > 14)
            value = value.slice(0, -1)

        // check if is cnpj 11.222.333/0001-99
        if(value.length > 11){

            // 11.222333000199
            value = value.replace(/(\d{2})(\d)/, '$1.$2')

            // 11.222.333000199
            value = value.replace(/(\d{3})(\d)/, '$1.$2')

            // 11.222.333/000199
            value = value.replace(/(\d{3})(\d)/, '$1/$2')

            // 11.222.333/0001-99
            value = value.replace(/(\d{4})(\d)/, '$1-$2')            

        } else {
            //cpf 111.22233344
            value = value.replace(/(\d{3})(\d)/, '$1.$2')

            //cpf 111.222.33344
            value = value.replace(/(\d{3})(\d)/, '$1.$2')

            //cpf 111.222.333-44
            value = value.replace(/(\d{3})(\d)/, '$1-$2')
        }

        return value
    },
    formatCep(value){

        value = value.replace(/\D/g, '')

        if(value.length > 8)
            value = value.slice(0, -1)

        value = value.replace(/(\d{5})(\d)/, '$1-$2')

        return value

    }
}