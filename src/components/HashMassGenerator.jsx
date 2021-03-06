import React from 'react'
import HashGenerator from './HashGenerator.jsx'

export const DEFAULT_CONTAINER = ({children}) => (<div>{children}</div>)
export const DEFAULT_ARGORITHM_LIST = ['md5', 'sha1', 'sha256', 'sha512']

export default function HashMassGenerator (props) {
  const {
    container: Container = DEFAULT_CONTAINER,
    item: Item = DEFAULT_CONTAINER,
    hashGeneratorProps = {},
    algorithmList = DEFAULT_ARGORITHM_LIST,
    data = '',
    encoding = 'utf8'
  } = props

  return <Container>{
    algorithmList.map((algorithm, index) => (
      <Item algorithm={algorithm} index={index} key={index}><label>
        {algorithm}:&nbsp;
        <HashGenerator
          algorithm={algorithm}
          data={data}
          encoding={encoding}
          {...hashGeneratorProps}
        />
      </label></Item>
    ))
  }</Container>
}
