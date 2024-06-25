import Swal from "sweetalert2";

export function swallAlert(type = '', icon = 'success', { btnOk, btnCancel, title, message, callback }) {
    const swallOption = {}
    const customSwal = Swal.mixin({
        title: 'Image icon',
        customClass: {
            icon: 'border-0 border-none',
        },
        icon: icon
    })
    
    swallOption.title = title
    swallOption.text = message

    if (type === 'confirm' || type === 'confirm-danger') {
        swallOption.showCancelButton = true
        swallOption.confirmButtonText = btnOk
        swallOption.cancelButtonText = btnCancel
    } else if (type === 'danger' || type === 'success') {
        swallOption.showCancelButton = false
        swallOption.confirmButtonText = btnOk
    }

    customSwal.fire(swallOption).then(result => {
        if (result.value) {
            if (callback) callback()
        }
    })
}