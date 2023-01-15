import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const QuestionNameValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const nameParts: string[] = control.value.trim().split(' ').filter((namePart: string) => namePart.trim().length > 0); 

    if (nameParts.length === 0){
        return {
            productName: { message: "Question title cannot consist only of whitespaces" }
        };
    }

    return null;
};