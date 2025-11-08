<script setup lang="ts">
import { computed } from 'vue'
import Code from '../code.vue'

const xcodeInstallCode = computed(() => `// Step 1: Open Xcode and navigate to File → Add Packages…

// Step 2: Paste the repository URL:
https://git.yarrow.uz/ios-sdk.git

// Step 3: If the repository is private, Xcode will prompt for credentials:
// - Enter your GitLab username/email
// - Enter your PAT token as the password

// Step 4: Select the version/branch of the SDK you need, and add it to your target`)

const packageSwiftCode = computed(() => `.package(
    url: "https://git.yarrow.uz/ios-sdk.git",
    from: "1.0.0"
)`)

const envVarsCode = computed(() => `export GITLAB_USERNAME="your_username_or_email"
export GITLAB_PAT_TOKEN="your_personal_access_token"`)

const importCode = computed(() => `import YarrowSDK`)
</script>

<template>
  <div id="ios-installation">
    <div class="container">
      <h2>Installation & Authentication</h2>
      <p>
        The Yarrow iOS SDK is hosted on GitLab at <code>https://git.yarrow.uz/ios-sdk</code>.
        To access it, you must authenticate using your GitLab credentials (username/email + personal access token).
      </p>
    </div>

    <div class="container">
      <h3>Authentication (GitLab)</h3>
      <p class="note">
        <strong>Steps to authenticate:</strong>
      </p>
      <ol>
        <li>Log in to GitLab at: <code>https://git.yarrow.uz</code></li>
        <li>Create a Personal Access Token (PAT) under <strong>User Settings → Access Tokens</strong></li>
        <li>Give it appropriate permissions (e.g., <code>read_repository</code>, <code>read_package_registry</code>)</li>
        <li>When prompted during installation, use:
          <ul>
            <li><strong>Username:</strong> your GitLab username or email</li>
            <li><strong>Password:</strong> the PAT token you created</li>
          </ul>
        </li>
      </ol>
    </div>

    <div class="container">
      <h3>Installing the SDK via Swift Package Manager</h3>
      <h4>Option A: Using Xcode</h4>
    </div>
    <Code
      :code="xcodeInstallCode"
      language="swift"
      filename="Installation Steps"
      file-type="SWIFT"
    />

    <div class="container">
      <h4>Option B: Using Swift Package Manager from Command Line</h4>
      <p>Add the dependency to your <code>Package.swift</code>:</p>
    </div>
    <Code
      :code="packageSwiftCode"
      language="swift"
      filename="Package.swift"
      file-type="SWIFT"
    />

    <div class="container">
      <p class="note">
        <strong>Note:</strong> Ensure your authentication is configured so SPM can pull from the private registry with your GitLab credentials.
      </p>
    </div>

    <div class="container">
      <h3>Environment Variables (Recommended)</h3>
      <p>Avoid hard-coding credentials by using environment variables:</p>
    </div>
    <Code
      :code="envVarsCode"
      language="bash"
      filename=".env"
      file-type="BASH"
    />

    <div class="container">
      <h3>Authentication Summary</h3>
      <table class="auth-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Repository URL</td>
            <td><code>https://git.yarrow.uz/ios-sdk.git</code></td>
          </tr>
          <tr>
            <td>Username</td>
            <td>GitLab username or email</td>
          </tr>
          <tr>
            <td>Password</td>
            <td>Personal Access Token (PAT)</td>
          </tr>
          <tr>
            <td>Token Scope</td>
            <td><code>read_repository</code>, <code>read_package_registry</code></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="container">
      <h3>Importing the SDK</h3>
      <p>Once installation is complete, import the SDK module in your Swift code:</p>
    </div>
    <Code
      :code="importCode"
      language="swift"
      filename="YourFile.swift"
      file-type="SWIFT"
    />
  </div>
</template>

<style scoped>
#ios-installation {
  padding: 100px 0;

  .container {
    margin-bottom: 60px;

    h2 {
      font-weight: 600;
      font-size: 28px;
      text-align: center;
      color: var(--text-primary);
      margin-bottom: 20px;
    }

    h3 {
      font-weight: 600;
      font-size: 24px;
      text-align: center;
      color: var(--text-primary);
      margin-bottom: 15px;
    }

    h4 {
      font-weight: 600;
      font-size: 20px;
      text-align: center;
      color: var(--text-secondary);
      margin-bottom: 15px;
    }

    p {
      font-weight: 500;
      font-size: 18px;
      text-align: center;
      max-width: 800px;
      margin: 20px auto;
      color: var(--text-secondary);
      line-height: 1.6;

      code {
        background: var(--bg-secondary);
        padding: 2px 8px;
        border-radius: 4px;
        font-family: 'Fira Code', monospace;
        color: var(--accent-color);
      }
    }

    ol, ul {
      max-width: 800px;
      margin: 20px auto;
      text-align: left;
      color: var(--text-secondary);
      font-size: 18px;
      line-height: 1.8;

      li {
        margin-bottom: 10px;

        code {
          background: var(--bg-secondary);
          padding: 2px 8px;
          border-radius: 4px;
          font-family: 'Fira Code', monospace;
          color: var(--accent-color);
        }

        strong {
          color: var(--text-primary);
        }

        ul {
          margin-top: 10px;
        }
      }
    }

    .note {
      background: var(--bg-secondary);
      border-left: 4px solid var(--accent-color);
      padding: 20px;
      margin: 20px auto;
      border-radius: 5px;
      font-size: 16px;
      text-align: left;
      max-width: 800px;
      color: var(--text-secondary);

      strong {
        color: var(--text-primary);
      }
    }

    .auth-table {
      max-width: 800px;
      margin: 20px auto;
      width: 100%;
      border-collapse: collapse;
      background: var(--bg-secondary);
      border-radius: 10px;
      overflow: hidden;

      th, td {
        padding: 15px 20px;
        text-align: left;
        border-bottom: 1px solid var(--border-color);
      }

      th {
        background: var(--accent-color);
        color: white;
        font-weight: 600;
        font-size: 18px;
      }

      td {
        color: var(--text-secondary);
        font-size: 16px;

        code {
          background: var(--bg-glass);
          padding: 2px 8px;
          border-radius: 4px;
          font-family: 'Fira Code', monospace;
          color: var(--accent-color);
        }
      }

      tr:last-child td {
        border-bottom: none;
      }
    }
  }
}
</style>
