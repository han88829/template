import { Rule, RuleType } from '@midwayjs/validate';

export class EditPwdDTO {
  @Rule(RuleType.string().required())
  oldPassword: string;

  @Rule(
    RuleType.string()
      .pattern(
        /^(?=.*[A-Za-z])(?=.*\d)|(?=.*[A-Za-z])(?=.*[\W_])|(?=.*\d)(?=.*[\W_]).{6,}$/
      )
      .required()
      .error(new Error('密码至少六位且要包含字母、数字、特殊字符中的两项'))
  )
  password: string;

  @Rule(
    RuleType.string()
      .pattern(
        /^(?=.*[A-Za-z])(?=.*\d)|(?=.*[A-Za-z])(?=.*[\W_])|(?=.*\d)(?=.*[\W_]).{6,}$/
      )
      .required()
      .error(new Error('密码至少六位且要包含字母、数字、特殊字符中的两项'))
  )
  confirmPassword: string;
}
