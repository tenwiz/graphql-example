import { UserInputError } from 'apollo-server-express';
import passwordValidator from 'password-validator';
import { isEmail } from 'validator';

const passwordSchema = new passwordValidator()
    .is().min(8)
    .is().max(20)
    .has().letters()
    .has().digits()
    .has().symbols()
    .has().not().spaces();

export const validators = {

    Mutation: {

        login: (resolve, parent, args, context) => {
            const { email } = args;

            if (!isEmail(email)) {
                throw new UserInputError('Invalid Email address!');
            }

            return resolve(parent, args, context);
        },

        signup: (resolve, parent, args, context) => {
            const { email, password, rePassword } = args.signupReq;

            if (!isEmail(email)) {
                throw new UserInputError('Invalid Email address!');
            }

            if (password !== rePassword) {
                throw new UserInputError('Passwords don\'t match!');
            }

            if (!passwordSchema.validate(password)) {
                throw new UserInputError('Password is not strong enough!');
            }

            return resolve(parent, args, context);
        },

        changePassword: (resolve, parent, args, context) => {
            const { newPassword, reNewPassword } = args;

            if (newPassword !== reNewPassword) {
                throw new UserInputError('Passwords don\'t match!');
            }

            if (!passwordSchema.validate(newPassword)) {
                throw new UserInputError('Password is not strong enough!');
            }

            return resolve(parent, args, context);
        }
    }
};
