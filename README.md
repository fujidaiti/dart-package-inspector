# dart-package-inspector

This action inspects your Dart/Flutter packages for a certain criteria based on the report  produced by the [pana](https://pub.dev/packages/pana), a package analyzer that is used on the pub.dev to compute Pub points.

Here's examples of what you can verify with this action:

- The package earns a total of 140 Pub points.
- The package earns at least 40 Pub points in the "Pass static analysis" category.
- The package scores 100% in the "Support up-to-date dependencies" category.
- The package supports the all platforms.
- The package is dart3 compatible.

</br>

## Usage

This action is intended to be used as a post-processor of  [dart-package-analyzer](https://github.com/axel-op/dart-package-analyzer.git), a well known GitHub Action that runs pana in the workflows. dart-package-inspector will use the output of this action as one of its inputs.

```yaml
name: Example workflow
on: [push, pull_request]

jobs:
  package-analysis:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2 # Required for dart-package-analyzer
      
      - uses: axel-op/dart-package-analyzer@v3 # Run pana on your package
        id: analysis # Set an ID to reference the outputs in the next step
        with:
          githubToken: ${{ secrets.GITHUB_TOKEN }}
      
      - uses: fujidaiti/dart-package-inspector@v1
        with:
          report: ${{ steps.analysis.outputs.json_output }} # Required
          min-pub-points: 120
```

</br>

### Inputs

- `report` - string, **Required**

  JSON output of pana. Usually obtianed from the dart-package-analyzer's outputs.

  Example:

  ```yaml
  report: ${{ steps.analysis.outputs.json_output }}
  ```

  

- `min-pub-points` - integer

  The minimum total Pub points required. The default is set to 0.

  Example:

  ```yaml
  min-pub-points: 140
  ```

  

- `min-convention-points` - integer

  The minimum required Pub points in the "Follow Dart file conventions" category. The default is set to 0.

  Example:

  ```yaml
  min-convention-points: 30
  ```

  

- `min-documentation-points` - integer

  The minimum required Pub points in the "Provide documentation" category. The default is set to 0.

  Example:

  ```yaml
  min-documentation-points: 20
  ```

  

- `min-platform-points` - integer

  The minimum required Pub points in the "Platform support" category. The default is set to 0.

  Example:

  ```yaml
  min-platform-points: 20
  ```

  

- `min-analysis-points` - integer

  The minimum required Pub points in the "Pass static analysis" category. The default is set to 0.

  Example:

  ```yaml
  min-analysis-points: 50
  ```

  

- `min-dependency-points` - integer

  The minimum required Pub points in the "Support up-to-date dependencies" category. The default is set to 0.

  Example:

  ```yaml
  min-dependency-points: 20
  ```

  

- `dart3-compatible` - boolean

  Set to `true` to make sure the package is dart3 compatible, or set to `false` to disable this check. `true` by default.

  Example:

  ```yaml
  dart3-compatible: true
  ```

  

- `sound-null-safety` - boolean

  Set to `true` to make sure the package supports null safety or set to `false` to disable this check. `true` by default.

  Example:

  ```yaml
  soud-null-safety: true
  ```

  

- `supported-SDKs` - string

  List of SDKs that the package should support. The possible values are `dart` and `flutter`. If not specified, the check for the supported SDKs is disabled.

  ```yaml
  supported-SDKs: dart, flutter
  ```

  

- `supported-platforms` - string

  List of platform names that the package should support. The possible values are `ios`, `android`, `linux`, `windows`, `macos`, and `web`. If not specified, the check for the supported platforms is disabled.
  
  Example:
  
  ```yaml
  supported-platforms: ios, android
  ```

</br>

## Error messages

If any requirements are not met, error messages are displayed in the Annotations section on the workflow page.

<img width="865" alt="スクリーンショット 2023-08-09 14 57 32" src="https://github.com/fujidaiti/dart-package-inspector/assets/68946713/ba95ca29-637d-440e-886f-89a75cbb9103">

<br/>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<br />

## Support

Please [give me a star](https://github.com/fujidaiti/dart-package-inspector.git) on GitHub if you like this package. It will motivate me!

<br />

## Thanks

[typescript-action](https://github.com/actions/typescript-action.git) : dart-package-inspector is based on this template repository.

</br>
