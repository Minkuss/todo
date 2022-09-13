import { FC } from "react";
import { Button, Card, FormGroup, InputGroup } from "@blueprintjs/core";
import { SubmitHandler, useForm, ValidateResult } from "react-hook-form";

import * as classes from "./LoginForm.styles";
import classNames from "classnames";

export interface ILoginForm {
  username: string;
  password: string;
}

export const LoginForm: FC = () => {
  const {
    formState,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<ILoginForm>();
  const onSubmit: SubmitHandler<ILoginForm> = (data: any) => console.log(data);

  return (
    <Card className={classes.card}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          // style={
          //   errors.username?.message || errors.password?.message
          //     ? { marginTop: "0%" }
          //     : { marginTop: "4%" }
          // }
          className={classes.formGroup}
          label="Login"
          helperText={errors.username?.message}
        >
          <input
            {...register("username", {
              required: { value: true, message: "Please enter your email" },
            })}
            placeholder="Enter your email"
            className={classNames("bp4-input .modifier", classes.input)}
          />
        </FormGroup>
        <FormGroup
          helperText={errors.password?.message}
          className={classes.formGroup}
          label="Password"
        >
          <input
            {...register("password", {
              required: { value: true, message: "Please enter your password" },
            })}
            placeholder="Enter your password"
            className={classNames("bp4-input .modifier", classes.input)}
          />
        </FormGroup>
        <Button
          className={classes.btn}
          intent="primary"
          fill
          text="Log in"
          type="submit"
        />
      </form>
    </Card>
  );
};
