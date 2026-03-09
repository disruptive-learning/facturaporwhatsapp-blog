import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Logo = () => (
  <StaticImage
    src="../images/facturaporwhatsapp.png"
    alt="Factura por WhatsApp"
    height={120}
    placeholder="none"
    formats={["auto", "webp", "avif"]}
  />
)

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/"><Logo /></Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        <Logo />
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()} Todos los derechos reservados.
      </footer>
    </div>
  )
}

export default Layout
