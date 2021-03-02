import { graphql, Link, StaticQuery } from "gatsby"
import GatsbyImage from "gatsby-image"
import React from "react"

export const Logo = () => {
  return(
  <StaticQuery
    query={graphql`
      query {
        file(relativePath: { eq: "NAYA_logo.png" }) {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <GatsbyImage fluid={data.file.childImageSharp.fluid}/>
    )}
  />)
}

export default props => (
  <div style={{ width: "78px", margin:'0 auto' }}>
    <Link to="/">
      <Logo />
    </Link>
  </div>
)