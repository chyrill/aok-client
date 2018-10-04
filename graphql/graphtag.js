/* eslint-disable */
import gql from 'graphql-tag'

export const SIGNUP_MUTATION = gql`
    mutation signup($email:!String, $password:!String, $lastName:!String, $firstName:!String, $roleId: [roleEnumList]) {
        signup(data: {
            email: $email
            password: $password,
            lastName: $lastName,
            firstName: $firstName,
            roleId: $roleId
        })
    }
`;

export const CHECKUSER_MUTATION = gql`
    mutation checkuser($email:!String, $password:!String, $lastName:!String, $firstName:!String) {
        checkuser(data: {
            email: $email
            password: $password,
            lastName: $lastName,
            firstName: $firstName
        })
    }
`;