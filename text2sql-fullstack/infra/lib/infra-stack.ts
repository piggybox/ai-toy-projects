import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs"
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from "aws-cdk-lib/aws-lambda"

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const layer = new lambda.LayerVersion(this, "BaseLayer", {
      code: lambda.Code.fromAsset("base/layer.zip"),
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_9],
    })

    const apiLambda = new lambda.Function(this, "ApiFunction", {
      runtime: lambda.Runtime.PYTHON_3_9,
      code: lambda.Code.fromAsset("../backend/"),
      handler: "api.handler",
      layers: [layer],
    })
  }
}
