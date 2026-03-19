# Security Policy

## 🔒 Security Overview

This portfolio project is designed with security as a top priority. This document outlines the security measures in place, known vulnerabilities, and procedures for reporting security issues.

## 🛡️ Security Measures Implemented

### 1. Content Security Policy (CSP)

- **Environment-Aware CSP**: Strict CSP in production, permissive in development
- **Violation Reporting**: All CSP violations are logged to `/api/csp-violation`
- **Inline Scripts Disabled**: No inline scripts allowed in production
- **Object-src: none**: Prevents Flash, Java applets, and other plugin execution

#### Production CSP Rules
```
default-src 'self'
script-src 'self'
style-src 'self' 'unsafe-inline'  # Required for Tailwind CSS
img-src 'self' data: blob: https:
font-src 'self' data:
connect-src 'self' https://api.resend.com
frame-src 'self' https://www.youtube.com https://w.soundcloud.com https://www.behance.net https://open.spotify.com
object-src 'none'
base-uri 'self'
form-action 'self'
frame-ancestors 'none'
```

### 2. Security Headers

| Header | Value | Purpose |
|--------|--------|---------|
| `X-Frame-Options` | DENY | Prevents clickjacking attacks |
| `X-Content-Type-Options` | nosniff | Prevents MIME type sniffing |
| `X-XSS-Protection` | 1; mode=block | Enables browser XSS filter |
| `Referrer-Policy` | strict-origin-when-cross-origin | Controls referrer information |
| `Permissions-Policy` | camera=(), microphone=(), geolocation=() | Restricts device permissions |

### 3. Contact Form Security

The contact form (`/api/contact`) implements multiple security layers:

- **Rate Limiting**: 3 requests per minute per IP address (in-memory)
- **Input Validation**: Length limits and email format validation
- **XSS Prevention**: HTML escaping for all user inputs
- **Environment Variables**: No hardcoded credentials
- **Sanitization**: All inputs sanitized before email transmission

### 4. Dependency Security

- **TypeScript Strict Mode**: Enabled for type safety
- **Regular Audits**: Automated security scanning via npm scripts
- **Private Repository**: Code hosted in private GitHub repository
- **No Build-time Secrets**: All secrets managed via environment variables

### 5. Development Practices

- **No Eval/Function**: Dynamic code execution avoided
- **No dangerouslySetInnerHTML**: User inputs sanitized before rendering
- **No SQL/NoSQL**: No database connections, eliminating injection risks
- **No File Uploads**: No file upload functionality, eliminating upload attacks

## 🔐 Environment Variables

All sensitive data is managed through environment variables:

```bash
# Email Service
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL=hello@michael.dev

# Build/Deployment
NODE_ENV=production
```

**Security Requirements:**
- Never commit `.env` files to version control
- Use `.env.local` for local development
- Rotate API keys regularly
- Use strong, unique API keys

## 📊 Security Testing

### Automated Security Checks

Run these commands before every deployment:

```bash
# Check for vulnerabilities
npm run security:audit

# Check for outdated packages
npm run security:outdated

# Run full security check
npm run security:check

# Complete security test suite
npm run test:security
```

### Security Scripts

| Script | Description |
|---------|-------------|
| `npm run security:audit` | Run npm audit at moderate level |
| `npm run security:audit:fix` | Automatically fix npm audit issues |
| `npm run security:outdated` | Check for outdated dependencies |
| `npm run security:check` | Run audit and outdated check |
| `npm run test:security` | Run full security test suite |

## 🚨 Known Limitations

### Medium Priority

1. **In-Memory Rate Limiting**
   - Rate limits reset on server restart
   - Not distributed across multiple instances
   - **Mitigation**: Consider Redis/Upstash for production

2. **No Automated Security CI/CD**
   - Security checks must be run manually
   - **Recommendation**: Add security scanning to CI/CD pipeline

3. **No Dependency Lockfile Verification**
   - `npm ci` not enforced in deployment
   - **Recommendation**: Add integrity checks in CI/CD

### Low Priority

1. **Manual Header Management**
   - Security headers configured manually
   - **Recommendation**: Consider using `helmet` or similar library

2. **Manual Input Sanitization**
   - Custom HTML escaping function
   - **Recommendation**: Use `DOMPurify` library

## 🔍 Security Checklist

Before deploying to production:

- [ ] Run `npm run test:security`
- [ ] Verify all environment variables are set
- [ ] Check CSP violation logs for issues
- [ ] Review recent commits for security issues
- [ ] Update dependencies to latest versions
- [ ] Test contact form rate limiting
- [ ] Verify security headers are present
- [ ] Check CSP is in strict mode

## 🐛 Reporting Security Issues

### How to Report

If you discover a security vulnerability, please report it responsibly:

1. **Email**: mic.oguntimehin@gmail.com
2. **Subject**: [SECURITY] - Brief description
3. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if applicable)

### What to Expect

- Response within 48 hours
- Acknowledgment of receipt
- Estimated timeline for fix
- Notification when fix is deployed

### Disclosure Policy

We follow **Responsible Disclosure**:
- Do not publicly disclose the vulnerability
- Allow reasonable time for remediation
- Coordinate disclosure for public advisory
- Credit researchers in security advisories

## 🔗 Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [npm Audit](https://docs.npmjs.com/cli/audit)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

## 📅 Security Maintenance

### Regular Tasks

| Frequency | Task |
|------------|-------|
| Weekly | Monitor CSP violation logs |
| Monthly | Run `npm run security:audit` |
| Quarterly | Update all dependencies |
| Quarterly | Review security documentation |
| Biannually | Comprehensive security audit |

### Update Policy

Last updated: March 2026

Next review: September 2026

---

**This security policy is a living document.** As new threats emerge and best practices evolve, this document will be updated to maintain the highest security standards.