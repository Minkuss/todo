import { FC } from "react";
import { Button, Card, FormGroup } from "@blueprintjs/core";
import { useForm, ValidateResult } from "react-hook-form";

import * as classes from "./form.styles";
import * as anim from "./animation.styles";
import classNames from "classnames";

export interface IRegisterForm {
  username: string;
  password: string;
}

export interface IRegisterFormPage {
  onSubmit: (value: { username: string; password: string }) => unknown;
  match: boolean;
}

export const RegisterForm: FC<IRegisterFormPage> = (props) => {
  const { onSubmit, match }: IRegisterFormPage = {
    ...defaultProps,
    ...props,
  };

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<IRegisterForm>();

  return (
    <Card className={classes.card}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          className={classes.formGroup}
          label="Write your email or nickname"
          helperText={errors.username?.message}
        >
          <input
            {...register("username", {
              required: {
                value: true,
                message: "Please enter your email or nickname",
              },
              validate: (value) => validateUsername(value, match),
            })}
            placeholder="best@gmail.com"
            className={classNames("bp4-input .modifier", classes.input)}
          />
        </FormGroup>
        <FormGroup
          helperText={errors.password?.message}
          className={classes.formGroup}
          label="Create your password"
        >
          <input
            {...register("password", {
              required: { value: true, message: "Please enter your password" },
            })}
            placeholder="Super secret password"
            className={classNames("bp4-input .modifier", classes.input)}
          />
        </FormGroup>
        <Button
          className={classes.btn}
          intent="primary"
          fill
          text="Sign up"
          type="submit"
        />
      </form>
    </Card>
  );
};

function validateUsername(username: string, match: boolean): ValidateResult {
  let valText = "";

  if (username.includes(" ")) {
    valText = "Invalid format for login";
  } else {
    valText = "This account name is already exists";
  }

  if (match === false && username !== "2") {
    return undefined;
  }
  return valText;
}

const defaultProps: Required<IRegisterFormPage> = {
  onSubmit: () => {},
  match: false,
};
