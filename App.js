import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your full name'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email address'),
  password: Yup.string()
    .min(8)
    .required('Please enter your password')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Must contain minimun 8 characters, at least one uppercase letter, one number and one special character',
    ),
  confirmPassword: Yup.string()
    .min(8, 'Confirm password must be 8 characters long.')
    .oneOf([Yup.ref('password')], 'Your passwords do not match') //Hago referencia al campo de password
    .required('Confirm password is required'),
  mobile: Yup.string()
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .required('Please enter your mobile number'),
});

const App = () => {
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobile: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={values => Alert.alert(JSON.stringify(values))}>
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        isValid,
        handleSubmit,
      }) => (
        <View style={styles.wrapper}>
          <StatusBar barStyle={'light-content'} />
          <View style={styles.formContainer}>
            <Text style={styles.title}>Sign Up</Text>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Full Name"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={() => setFieldTouched('name')} //Para que muestre mensaje del respectivo campo
              />
              {touched.name && errors.name && (
                <Text style={styles.errorTxt}>{errors.name}</Text>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Email Address"
                autoCapitalize={false}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorTxt}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Password"
                secureTextEntry={true}
                autoCapitalize={false}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorTxt}>{errors.password}</Text>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Confirm Password"
                secureTextEntry={true}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={() => setFieldTouched('confirmPassword')}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorTxt}>{errors.confirmPassword}</Text>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Mobile No."
                keyboardType="iphone-pad"
                value={values.mobile}
                onChangeText={handleChange('mobile')}
                onBlur={() => setFieldTouched('mobile')}
              />
              {touched.mobile && errors.mobile && (
                <Text style={styles.errorTxt}>{errors.mobile}</Text>
              )}
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              style={[
                styles.submitBtn,
                {backgroundColor: isValid ? '#395B64' : '#A5C9CA'},
              ]}
              disabled={!isValid}>
              <Text style={styles.submitBtnTxt}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default App;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C3333',
    paddingHorizontal: 15,
  },
  formContainer: {
    backgroundColor: '#F5EDDC',
    padding: 20,
    borderRadius: 20,
    width: '100%',
  },
  title: {
    color: '#16213E',
    fontSize: 26,
    fontWeight: '400',
    marginBottom: 15,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  inputStyle: {
    borderColor: '#16213E',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  errorTxt: {
    fontSize: 12,
    color: '#FF0D10',
  },
  submitBtn: {
    // backgroundColor: '#395B64',
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
  },
  submitBtnTxt: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
});
