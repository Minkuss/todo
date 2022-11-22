import { FC, useEffect } from "react";
import { Button, Card, FormGroup, InputGroup } from "@blueprintjs/core";
import { SubmitHandler, useForm, ValidateResult } from "react-hook-form";

import * as classes from "./form.styles";
import * as anim from "./animation.styles";
import classNames from "classnames";

export interface ILoginForm {
  username: string;
  password: string;
}

export interface ILoginFormPage {
  onSubmit: (value: { username: string; password: string }) => unknown;
}

export const LoginForm: FC<ILoginFormPage> = (props) => {
  const { onSubmit }: ILoginFormPage = {
    ...defaultProps,
    ...props,
  };

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<ILoginForm>();

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
              required: {
                value: true,
                message: "Please enter your email or nickname",
              },
            })}
            placeholder="Enter your login (email, nickname)"
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
          text="Sign in"
          type="submit"
        />
      </form>
    </Card>
  );
};

const defaultProps: Required<ILoginFormPage> = {
  onSubmit: () => {},
};
