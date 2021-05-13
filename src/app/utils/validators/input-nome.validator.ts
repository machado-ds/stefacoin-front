import { AbstractControl } from '@angular/forms';

export function apenasLetrasValidation(control: AbstractControl) {
    if (!/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/.test(control.value)) {
        return { apenasLetras: true };
    }
    return null;
}

export function vazioValidation(control: AbstractControl) {
    if (control.value.trim() == '') {
        return { vazio: true };
    }
    return null;
}