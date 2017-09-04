import React from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

export default class NamedValues extends React.Component {
  constructor (props) {
    super(props)

    const {
      value,
      namedValues = new Map(),
      defaultName = '',
      onChange = () => {},
      textFieldGetValue = x => x,
      textFieldSetValue = x => x,
      textFieldProps = {},
      selectFieldProps = {},
      createMenuItemProps = () => ({}),
      container = props => (<div {...props} />)
    } = props

    this.state = {
      onChange,
      textFieldGetValue,
      textFieldSetValue,
      textFieldProps,
      selectFieldProps,
      createMenuItemProps,
      container,
      ...this.createState(value, namedValues, defaultName)
    }
  }

  render () {
    const {
      textFieldGetValue,
      textFieldSetValue,
      container: Container
    } = this.state

    const onChange = value => {
      let prevent = false

      this.state.onChange(value, {
        preventDefault: () => { prevent = true }
      })

      prevent || this.setState(
        this.createState(value, this.state.namedValues, this.state.defaultName)
      )
    }

    return <Container>
      <div><TextField
        name='anonymous-value'
        value={textFieldSetValue(this.state.value)}
        onChange={(_, value) => onChange(textFieldGetValue(value))}
        {...this.state.textFieldProps}
      /></div>

      <div><SelectField
        name='named-value'
        value={this.state.value}
        onChange={(_, __, value) => onChange(value)}
        {...this.state.selectFieldProps}
      >{
        Array.from(this.state.namedValues)
          .map(([value, name]) => (<MenuItem
            value={value}
            primaryText={name}
            key={name}
            {...this.state.createMenuItemProps({value, name})}
          />))
      }</SelectField></div>

    </Container>
  }

  createState (value, namedValues, defaultName) {
    const name = namedValues.has(value)
      ? namedValues.get(value)
      : defaultName

    return {
      value,
      namedValues,
      defaultName,
      name
    }
  }
}
