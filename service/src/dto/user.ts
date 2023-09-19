import { Rule, RuleType } from '@midwayjs/validate';

export class EditPwdDTO {

    @Rule(RuleType.string().required())
    oldPassword: string;

    @Rule(RuleType.string().min(6).required())
    password: string;

    @Rule(RuleType.string().min(6).required())
    confirmPassword: string;
}
