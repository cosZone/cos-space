---
title: NestJS学习之优秀项目分析与最佳实践
link: nest-learn-project-1
catalog: true
lang: cn
date: 2023-09-23 23:28:03
sticky: true
tags:
- nestjs
- 后端
- node
categories:
- [笔记, 后端]
--- 
## 前言

进入 NestJS 的世界可能会让你感到不知所措，尤其是当你面对众多的模块和概念时。本文不仅会深入分析优秀的 NestJS 项目，介绍常用的 Nest 内置模块，还会解锁一些 NestJS 的高级特性和最佳实践，来帮助你更好地理解和应用这个强大的 Node.js 框架。无论你是一个初学者还是有经验的开发者，这篇文章都将为你提供宝贵的见解和实用的技巧，让你能够更加了解 NestJS。

我将从 [GitHub 上的 Awesome NestJS 列表](https://github.com/nestjs/awesome-nestjs#open-source)中选取优秀项目进行分析，看它们如何使用 NestJS 的各种功能和模块。 此外，我还将详细介绍一些常用的 Nest 内置模块，如 `@nestjs/core`，并通过代码示例展示它们的应用场景。

- [GitHub - nestjs/awesome-nestjs: A curated list of awesome things related to NestJS 😎](https://github.com/nestjs/awesome-nestjs#open-source)

本文还包括一些重要的后端常用术语解释，以帮助你更全面地理解这个框架。

本文不会直接告诉你如何从零开始搭建一个 NestJS 项目，因为这样的教程和文章网上已经有很多。 相反，本文的主要目的是通过深入分析和解读，让你在实际应用中能更加得心应手。当你遇到某个模块或功能不知如何使用时，这篇文章将作为你的参考和灵感来源。

通过这样的角度和方法，我希望能帮助你不仅仅是“会用”，而是“懂得用”NestJS，从而更加自信和高效地进行后端开发。

让我们一起深入 NestJS 的世界，探索它的无限可能性吧！

## 整体架构 & 名词解释

在深入 NestJS 的各种模块和功能之前，了解常见优秀项目的整体架构和相关名词是非常重要的。这不仅有助于你更好地理解框架的工作原理，还能让你在开发过程中做出更加明智的决策。

### 目录结构

```shell
prisam // 数据库相关
src
├─ auth // 授权登陆模块
│   ├─ auth.controller.ts
│   ├─ auth.guard.ts // 守卫 
│   ├─ auth.interface.ts // 存放局部的该模块的类型声明
│   ├─ auth.module.ts
│   ├─ auth.service.ts
│   ├─ dto
│   │   ├─ sign-in.dto.ts
│   ├─ entities
│   │   └─ refresh-token.entity.ts
├─ common // 全局通用模块
|   ├─ configs // 全局配置 
|   ├─ constants // 定义一些常量
|   ├─ decorators // 全局装饰器
|   ├─ filters // 全局过滤器
|   ├─ interceptors // 全局拦截器
|   ├─ interfaces // 全局类型声明
|   ├─ services // 全局公共服务
|   ├─ * // 其他
├─ utils // 工具函数, 尽量存放纯函数
├─ app.*.ts // app 模块, 其他 module 需要引用到 app module
├─ main.ts // 应用入口
```

以一个用户授权模块为例，通常能看到这些文件，而他们的用途如下：

- `*.module.ts` : 通常是模块文件，用于组织和管理控制器、服务、守卫等。它是Nest.js 应用程序的**基础单元**。
- `*.service.ts` : Service 层通常用于处理模块的业务逻辑。它们通常被注入到**控制器**（controller）中，并可以访问数据库、执行计算等。
- `*.controller.ts` : 控制器文件用于处理HTTP请求和响应。它们通常依赖于 Service 来执行业务逻辑。
- `*.guard.ts` : 守卫文件用于实现**路由保护**，例如身份验证和授权。
- `*.interface.ts` : 接口文件用于定义局部用到的类型和数据结构，以确保代码的健壮性。（ts声明等）
- `*.dto.ts` : 数据传输对象（DTO）用于验证客户端发送的数据。
- `*.entity.ts` : 实体文件用于定义数据库模型。

其中一些名词的简单解释如下：

- **DTO（Data Transfer Object）**: 数据传输对象，用于在对象和 API 之间传输数据。
- **Guard**: 守卫，用于实现权限控制和访问验证。
- **Module**: 模块，NestJS 的基本组织单位，用于组织和管理控制器、服务等。
- **Service**: 服务，包含主要的业务逻辑，通常被注入到控制器中。
- **Entity**: 实体，用于定义数据库模型，通常与 ORM（对象关系映射）一起使用。
- **Interceptor**:  拦截器在 NestJS 中是一个用 `@Injectable()` 装饰器注释的类，并实现 `NestInterceptor` 接口。拦截器用于在函数执行之前或之后执行一些操作，例如日志记录、异常处理、数据转换等。
- **Reflector**:  Reflector 主要用于元数据的反射和操作。在拦截器中，Reflector 可以用于获取方法或类上设置的自定义元数据，从而允许更灵活的操作。

通过以上的目录结构和名词解释，我希望能为你提供一个清晰的视角，以更全面地理解 NestJS 的架构和设计理念。接下来，我们将深入探讨这些概念，并通过实际的代码示例来展示它们是如何在 NestJS 项目中应用的。

### Module

1. **根模块**：每个Nest.js应用程序都有一个根模块，它是 Nest 用于构建应用程序图 （**application graph**）的起点。这个图用于解析模块与提供者（Providers）之间的关系和依赖。
2. **组织组件**：模块是组织和管理组件（如控制器、服务等）的有效方式。通过模块，你可以将密切相关的功能组合在一起。
3. **多模块架构**：对于大型应用程序，通常会采用多模块架构。每个模块都封装了一组特定的、密切相关的功能。

```ts
// 引入Nest.js核心模块
import { Module } from '@nestjs/common';
// 引入其他相关组件
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 使用@Module装饰器定义模块
@Module({
  // 导入其他模块
  imports: [],
  // 声明该模块的控制器
  controllers: [AppController],
  // 声明该模块的提供者（通常是服务）
  providers: [AppService],
})
export class AppModule {}
```

#### 推荐阅读

1. [Modules | NestJS - A progressive Node.js framework](https://docs.nestjs.com/modules)
2. [深入了解Nest的模块Module - 掘金](https://juejin.cn/post/6925605351475806216)

### Service 层（服务层）

在软件架构中，通常会有几个不同的层来组织代码和功能。这些层有助于实现关注点分离（Separation of Concerns），使得代码更易于维护和扩展。在本例中，我们主要关注以下几个层：Service层和Controller层，至于DAO层：

> 无论是nest还是egg，官方demo里都没有明确提到dao层，直接在service层操作数据库了。这对于简单的业务逻辑没问题，如果业务逻辑变得复杂，service层的维护将会变得非常困难。业务一开始一般都很简单，它一定会向着复杂的方向演化，如果从长远考虑，一开始就应该保留dao。

Service 层主要负责**业务逻辑的实现**。这一层通常会**与数据库进行交互**，执行 CRUD（创建、读取、更新、删除）操作，以及执行其他与业务逻辑相关的任务。

例如，一个名为 `UserService` 的服务可能有一个 `registerUser` 方法，该方法接收一个 `LoginUserDto` 对象，验证数据，并将新用户添加到数据库中。

```ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LoginUserDto } from './dto/LoginUserDto';

@Injectable()
export class AuthService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async registerUser(dto: LoginUserDto): Promise<void> {
    await this.prisma.user.create({
      data: {
        userName: dto.userName,
        password: dto.password,
      },
    });
  }
}
```

#### 推荐阅读

1. [NestJS - Services](https://docs.nestjs.com/providers#services)
2. [nest后端开发实战（二）——分层 - 知乎](https://zhuanlan.zhihu.com/p/448037259)
3. [浅谈NestJS设计思想（分层、IOC、AOP） - 掘金](https://juejin.cn/post/7192528039945699386)

### Controller 层（控制器层）

Controller 层主要负责处理来自客户端的请求和发送响应。控制器会使用 Service 层提供的方法来执行业务逻辑，并将结果返回给客户端。

例如，一个名为 `UserController` 的控制器可能有一个 `register` 方法，该方法接收客户端发送的 HTTP POST 请求和 `LoginUserDto` 数据。

```ts
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/LoginUserDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() userDto: LoginUserDto) {
    return await this.userService.registerUser(userDto);
  }
}
```

#### 推荐阅读

1. [Controllers | NestJS](https://docs.nestjs.com/controllers)
2. [nest.js-Controller基础用法 - 掘金](https://juejin.cn/post/7260697932173787173)

### DTO（Data Transfer Object）

用 po 和 dto来描述实体及其周边。po是持久化对象和数据库的表结构一一对应；dto数据传输对象则很灵活，可以在丰富的场景描述入参或返回值。下面是个user实体的例子：

#### 与 Service 层和 Controller 层的关系

- 在 Controller 层，DTO 用于验证来自客户端的请求数据。当客户端发送一个请求时，Nest.js 会使用 DTO 来验证请求体中的数据是否符合预期的格式和类型。
- 在 Service 层，DTO 用于执行业务逻辑。

这样，DTO 成为了 Controller 层和 Service 层之间的桥梁，使得数据在这两个层之间能够流动和转换，同时保证了类型安全和数据验证。

在这个例子中，`LoginUserDto` 是一个 DTO，它定义了用户注册时需要提交的数据格式。这个 DTO 在 Controller 层用于接收客户端的数据，并在 Service 层用于执行业务逻辑。

```ts
// module/dto/LoginUserDto.ts 
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
```

以上代码定义了用户注册时需要提交的数据格式。使用 [class-validator](https://www.npmjs.com/package/class-validator) 库来进行数据验证。

- **属性解释**
  - `userName`: 用户名，必须是字符串类型。
  - `password`: 密码，必须是字符串类型。

- **装饰器解释**
  - `@IsString()`: 确保字段是字符串类型。
  - `@IsOptional()`: 表示字段是可选的。

更多解释使用详见 <https://github.com/typestack/class-validator#usage>

#### 推荐阅读

1. [学习Nest.js（五）：使用管道、DTO 验证入参 - 知乎](https://zhuanlan.zhihu.com/p/381739245)
2. [NestJS 官方文档：DTO 和验证](https://docs.nestjs.com/techniques/validation)

### Entity（实体）

在 NestJS 或其他 TypeScript 框架中，`.entity.ts` 文件用于定义数据库模型。这些模型通常与数据库表一一对应，并用于描述表的结构和关系。实体类通常使用装饰器（decorators）来标注字段和其类型，以便 ORM 工具能够正确地与数据库交互。。

例如，一个名为 `UserEntity` 的实体可能如下所示：

```ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;
}
```

在这个例子中，`UserEntity` 类与数据库中的 `users` 表对应。它有三个字段：`id`、`name` 和 `description`，这些字段的类型和长度也通过装饰器进行了标注。

若是使用 Prisma ORM，则实体文件一般为单纯的类型定义如

```ts
export class GameInfo {
  id: number;
  name: string | null;
  description: string | null;
}
```

因为 prsima 的定义在 schema.prisma 中。

#### 示例代码

以下是一个名为 `RefreshTokenEntity` 的实体类示例，该实体用于存储用户的钱包地址和 JWT 访问令牌。

```ts
import { Entity, Column, PrimaryColumn } from 'typeorm';
import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';

@Entity('refresh_tokens')
export class RefreshTokenEntity {
  /**
   * 用户钱包地址
   */
  @PrimaryColumn()
  @IsString()
  @Transform(({ value }) => getAddress(value))
  public address: string;

  /**
   * Jwt Token
   */
  @Column('text')
  public accessToken: string;
}
```

在这个例子中，`RefreshTokenEntity` 类与数据库中的 `refresh_tokens` 表对应。它有两个字段：`address` 和 `accessToken`。`address` 字段还使用了 `class-validator` 和 `class-transformer` 库的装饰器进行了额外的验证和转换。

这样，你就可以在 Service 层或 DAO 层使用这个实体类进行数据库操作。

#### 推荐阅读

1. [TypeORM - Entity](https://typeorm.io/#/entities)
2. [NestJS - TypeORM](https://docs.nestjs.com/techniques/database)

### Guard（守卫）

在 NestJS 和其他一些后端框架中，Guard（守卫）是一种特殊类型的服务，用于实现**路由保护**。它们通常用于**身份验证**和**授权**，以确保只有具有适当权限的用户才能访问特定的路由或执行特定的操作。

例如，下面是一个名为 `AuthGuard` 的简单守卫，该守卫使用 JWT（JSON Web Token）进行身份验证：

```ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
```

在这个例子中，`AuthGuard` 实现了 `CanActivate` 接口，并定义了一个 `canActivate` 方法。这个方法会检查请求头中是否包含有效的 JWT。如果包含，该请求将被允许继续；否则，将抛出 `UnauthorizedException`。

#### 推荐阅读

1. [NestJS - Guards](https://docs.nestjs.com/guards)
2. [NestJS 守卫（Guards）详解 - 掘金](https://juejin.cn/post/6844903663840784398)
3. [NestJS 实战：使用 Guards 进行权限控制 - 知乎](https://zhuanlan.zhihu.com/p/346491300)

通过使用 Service 层和 Guard 层，你可以更有效地组织你的代码，使其更加模块化和可维护。同时，这也有助于实现更强大和灵活的业务逻辑和安全控制。

### Interceptor（拦截器）

在 NestJS 中，拦截器（**Interceptor**） 是一个用 `@Injectable()` 装饰器注释的类，并实现 `NestInterceptor` 接口。拦截器通常用于在函数执行之前或之后执行一些操作。拦截器可以用于多种用途，例如日志记录、异常处理、数据转换等。

一个简单的 `LoggingInterceptor` ：

```ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
} 
```

由于 `handle()` 返回 RxJS `Observable` ，因此我们可以使用多种运算符来操作流。在上面的示例中，我们使用了 `tap()` 运算符，它在可观察流正常或异常终止时调用我们的匿名日志记录函数，但不会以其他方式干扰响应周期。

#### 转换响应数据拦截器

一个简单的转换响应数据拦截器示例如下，该拦截器可以根据需要返回原始数据或包装后的数据。

##### 定义响应接口和元数据键

首先，我们定义一个响应接口`IResponse`和一个元数据键`IS_RAW_DATA_KEY`。

```ts
import { SetMetadata } from '@nestjs/common';
  
export interface IResponse<T> {
  code: number;
  message: string;
  data: T;
}

export const IS_RAW_DATA_KEY = 'is-raw-data';

/**
 * 控制返回数据是否通过 Response 包装
 * @constructor
 */
export const RawData = () => SetMetadata(IS_RAW_DATA_KEY, true);
```

- `IResponse<T>`: 用于包装响应数据的接口。
- `IS_RAW_DATA_KEY`: 用于标记是否返回原始数据的元数据键。
- `RawData()`: 一个装饰器，用于设置元数据键。

看不懂元数据？别急，接着看。

##### 实现拦截器

接下来，我们实现转换响应数据的拦截器。

```ts
// transform.interceptor.ts
import { IResponse, IS_RAW_DATA_KEY } from '@/common';
import { map, Observable } from 'rxjs';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

/**
 * 处理响应数据转化
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, IResponse<T> | T> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<IResponse<T> | T> {
    const isRawData = this.reflector.getAllAndOverride<boolean>(IS_RAW_DATA_KEY, [context.getHandler(), context.getClass()]);
    return next.handle().pipe(map((data) => (isRawData ? data : { code: 200, message: 'success', data })));
  }
}
```

- `TransformInterceptor`: 拦截器的主体。
- `isRawData`: 用于检查是否需要返回原始数据。
- `next.handle().pipe(...)`: 根据`isRawData`的值来决定返回原始数据还是包装后的数据。

##### 在 AppModule 中引用拦截器

最后，在 AppModule 中添加拦截器。

```ts
import { TransformInterceptor } from '@/common';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // others...
  ],
  controllers: [AppController],
  providers: [
    // others...
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
```

##### 使用 RawData 装饰器

现在，你可以在 Controller 中使用`@RawData()`装饰器来控制是否返回原始的响应数据。

```ts
@Controller('someResource')
export class SomeController {
  constructor(private someService: SomeService) {}

  @RawData()
  @Get(':someParam')
  someMethod(@Param('someParam') someParam: number): Promise<SomeEntity> {
    // Implementation details
  }
}
```

通过这种方式，你可以灵活地控制响应数据的格式。

Nest.js，很神奇吧。

#### 推荐阅读

1. [NestJS 官方文档：拦截器](https://docs.nestjs.com/interceptors)
2. [NestJS interceptors: Guide and use cases - LogRocket Blog](https://blog.logrocket.com/nestjs-interceptors-guide-use-cases/)

这样，你就可以更好地理解 Interceptor 层在 NestJS 中的作用和实现方式。希望这能帮助你更深入地了解 NestJS 的架构和最佳实践。

### Reflector（反射器）

在 NestJS 中，`Reflector` 是一个用于检索**元数据**的实用工具类。它通常用于自定义装饰器和拦截器中，以获取关于类、方法或属性的额外信息。这些信息可能是**通过装饰器在编译时添加的**。

在上面的拦截器例子中，`Reflector` 被用于获取与当前执行上下文（`ExecutionContext`）相关的元数据。这里，它用于检查是否应返回原始数据或应将数据封装在一个响应对象中。

```ts
const isRawData = this.reflector.getAllAndOverride<boolean>(IS_RAW_DATA_KEY, [context.getHandler(), context.getClass()]);
```

这行代码使用 `getAllAndOverride` 方法从当前的处理程序或类中获取 `IS_RAW_DATA_KEY` 的元数据。然后，这个元数据用于决定如何转换响应数据。

#### 使用场景

1. **自定义装饰器**：如果你有一个自定义装饰器，你可能需要使用 `Reflector` 来读取与该装饰器相关的元数据。
2. **权限控制**：在拦截器或守卫中，你可以使用 `Reflector` 来获取关于用户角色或权限的元数据，以实现更细粒度的控制。
3. **响应转换**：如上面的例子所示，你可以使用 `Reflector` 来决定如何格式化或转换出口数据。

#### 示例代码

```ts
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // ... 权限检查逻辑
  }
}
```

#### 推荐阅读

1. [NestJS - Reflector](https://docs.nestjs.com/guards#setting-roles-per-handler)
2. [NestJS - Custom Decorators](https://docs.nestjs.com/custom-decorators)
3. [NestJS 深入理解 Reflector 的使用场景](https://juejin.cn/post/6844904116339261447)

这样，`Reflector` 就成为了在 NestJS 中实现高度可配置和动态行为的关键工具。

## 常用 Nest 内置模块

这是扒拉各种 nest 项目的 package.json 总结得出的模块简介：

### @nestjs/core

- NPM: [@nestjs/core](https://www.npmjs.com/package/@nestjs/core)
- 文档: [NestJS Core Module](https://docs.nestjs.com/core/overview)
- **简介**: 这是 NestJS 框架的核心模块，提供了框架的**基础构建块和核心功能**。
- **使用场景**: 用于构建和初始化 NestJS 应用，几乎所有 NestJS 项目都会用到。
- **代码示例**:

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

``

### @nestjs/jwt

- NPM: [@nestjs/jwt](https://www.npmjs.com/package/@nestjs/jwt)
- 文档: [NestJS JWT Module](https://docs.nestjs.com/security/authentication#jwt-module)
- **简介**: 这个模块提供了 JWT（JSON Web Tokens）的支持，用于在 NestJS 应用中实现**身份验证和授权**。
- **使用场景**: 身份验证和授权，通常用于保护路由和资源。
- **代码示例**:

```ts
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: User) {
    return this.jwtService.sign({ user });
  }
}
```

### @nestjs/config

- NPM: [@nestjs/config](https://www.npmjs.com/package/@nestjs/config)
- 文档: [NestJS Config Module](https://docs.nestjs.com/techniques/configuration)
- **简介**: 这个模块用于**管理 NestJS 应用的配置信息**。它支持**环境变量、类型转换**等。
- **使用场景**: 用于管理应用的配置信息，如数据库连接字符串、API 密钥等。
- **代码示例**:

```ts
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getDatabaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL');
  }
}
```

### @nestjs/common

- NPM: [@nestjs/common](https://www.npmjs.com/package/@nestjs/common)
- 文档: [NestJS Common Module](https://docs.nestjs.com/controllers)
- **简介**: 这是 NestJS 的一个通用模块，提供了一系列常用的装饰器、助手函数和其他工具。如 `Injectable`, `Module`, `BadRequestException`, `Body`, `Controller`, `Get`, `Param`, `Post`, `Query` 等
- **使用场景**: 在 Controller 层、Service 层、Module 中都会用到，用于定义路由、依赖注入等。
- **代码示例**:

```ts
import { Controller, Get } from '@nestjs/common';

@Controller('hello')
export class HelloController {
  @Get()
  sayHello(): string {
    return 'Hello World!';
  }
}
```

### @nestjs/axios

- **NPM**: [@nestjs/axios](https://www.npmjs.com/package/@nestjs/axios)
- **文档**: [NestJS Axios Module](https://docs.nestjs.com/techniques/http-module)
- **简介**: 这个模块为 NestJS 提供了 Axios HTTP 客户端的封装，使得在 NestJS 应用中进行 HTTP 请求更加方便。 如 `HttpService`, `HttpModule`
- **使用场景**: 在 Service 层进行 HTTP 请求，如调用第三方 API。
- **代码示例**:

```ts
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ApiService {
  constructor(private httpService: HttpService) {}

  async fetchData(url: string) {
    const response = await this.httpService.get(url).toPromise();
    return response.data;
  }
}
```

实际项目一般会自行重写http Service 请求添加统一的日志等，如下:

```ts
import { HttpService } from '@nestjs/axios';
import { catchError, Observable, tap } from 'rxjs';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HttpClientService {
  constructor(private httpService: HttpService) {}

  private logger: Logger = new Logger(HttpClientService.name);
  
  /**
   * 重写 http Service GET 请求, 打印 Request 和 Response
   * @param url
   * @param config
   */
  get<T = any>(url: string, config?: AxiosRequestConfig): Observable<AxiosResponse<T, any>> {
    // 打印发送请求的信息
    this.logger.log(`GET ${url}`);
    return this.httpService.get<T>(url, config).pipe(
      // 在不改变 Observable 流的情况下打印收到的响应
      tap((response) => this.logger.log(`Response ${url} ${JSON.stringify(response.data)}`)),
      // 捕获错误，并打印错误信息
      catchError((error: AxiosError) => {
        const errorData = JSON.stringify(error.response?.data);
        this.logger.error(`GET Error ${url} ${errorData}`);
        throw new BadRequestException([errorData]);
      }),
    );
  }
}
```

### @nestjs/bull

- **NPM**: [@nestjs/bull](https://www.npmjs.com/package/@nestjs/bull)
- **文档**: [NestJS Bull Module](https://docs.nestjs.com/techniques/queues)
- **简介**: 这个模块提供了 Bull 队列库的封装，用于在 NestJS 应用中处理**后台作业和消息队列**。
- **使用场景**: 后台任务处理，如发送邮件、数据处理等。
- **代码示例**:

```ts
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('audio')
export class AudioProcessor {
  @Process('transcode')
  async transcode(job: Job<number>) {
    // Your logic here
  }
}
```

### @nestjs/cache-manager

- **NPM**: [@nestjs/cache-manager](https://www.npmjs.com/package/@nestjs/cache-manager)
- **文档**: [NestJS Caching](https://docs.nestjs.com/techniques/caching)
- **简介**: 这个模块提供了缓存管理功能，支持多种缓存存储方式，如内存、Redis等
- **使用场景**: 数据缓存，如 **API 响应**、**数据库查询结果**、**会话缓存**等。
- **代码示例**: 在这个示例中，我们使用了 `CacheModule` 来注册缓存，并使用 `CacheInterceptor` 拦截器来自动处理缓存逻辑。这样，当多次访问 `findAll` 方法时，结果会被缓存，从而提高响应速度。

```ts
import { CacheModule, CacheInterceptor, Controller, UseInterceptors } from '@nestjs/common';
import { CachingConfigService } from './caching-config.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      useClass: CachingConfigService,
    }),
  ],
})
export class AppModule {}

@Controller('posts')
export class PostsController {
  @UseInterceptors(CacheInterceptor)
  @Get()
  findAll() {
    // Your logic here
  }
}
```

### @nestjs/mongoose

- **NPM**: [@nestjs/mongoose](https://www.npmjs.com/package/@nestjs/mongoose)
- **文档**: [NestJS Mongoose Module](https://docs.nestjs.com/techniques/mongodb)
- **简介**: 这个模块提供了 Mongoose ODM（对象文档映射）的封装，用于在 NestJS 应用中与 MongoDB 数据库进行交互。
- **使用场景**: 数据库操作，特别是与 MongoDB 数据库的交互。
- **代码示例**:

```ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Cat extends Document {
  @Prop()
  name: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
```

### @nestjs/platform-express

- **NPM**: [@nestjs/platform-express](https://www.npmjs.com/package/@nestjs/platform-express)
- **文档**: [NestJS Overview](https://docs.nestjs.com/)
- **简介**: 这个模块是 NestJS 框架的 Express 适配器，用于在 NestJS 应用中使用 Express.js。
- **使用场景**: 用到其中的 `FileInterceptor` 处理文件上传
- **代码示例**: 在这个示例中，我们使用了 `@nestjs/platform-express` 提供的 `FileInterceptor` 来处理文件上传。这实际上是对 Express 的 `multer` 中间件的封装。

```ts
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
      },
    }),
  }))
  uploadFile(@UploadedFile() file) {
    return { url: `./uploads/${file.filename}` };
  }
}
```

### @nestjs/schedule

- **NPM**: [@nestjs/schedule](https://www.npmjs.com/package/@nestjs/schedule)
- **文档**: [NestJS Schedule Module](https://docs.nestjs.com/techniques/task-scheduling)
- **简介**: 这个模块提供了任务调度功能，用于在 NestJS 应用中执行定时任务。
- **使用场景**: 定时任务，如每日数据备份、定时推送等。
- **代码示例**:

```ts
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    // Your logic here
  }
}
```

### @nestjs/swagger

- **NPM**: [@nestjs/swagger](https://www.npmjs.com/package/@nestjs/swagger)
- **文档**: [NestJS Swagger Module](https://docs.nestjs.com/recipes/swagger)
- **简介**: 这个模块用于生成和维护 API 文档，基于 Swagger。
- **使用场景**: 自动生成 API 文档。
- **代码示例**:

```ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
```

### @nestjs/throttler

- **NPM**: [@nestjs/throttler](https://www.npmjs.com/package/@nestjs/throttler)
- **文档**: [NestJS Throttler](https://docs.nestjs.com/security/rate-limiting)
- **简介**: 这个模块提供了请求限制（Rate Limiting）功能，用于防止 API 被滥用。 有 `ThrottlerGuard`, `SkipThrottle` 等
- **使用场景**: 防止 API 滥用，如限制每分钟请求次数。
- **代码示例**:

```ts
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class AppGuard extends ThrottlerGuard {
  // Your logic here
}
```

## 其他包

### class-validator

- **NPM**: [class-validator](https://www.npmjs.com/package/class-validator)
- **文档**: [class-validator: Decorator-based property validation for classes.](https://github.com/typestack/class-validator#installation)
- **简介**: 基于装饰器的属性验证库，用于在 TypeScript 和 JavaScript 类中进行数据验证。内部使用 validator.js 进行验证。
- **使用场景**: 数据验证，如用户输入、请求体等。
- **代码示例**:

```ts
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
```

### class-transformer

- **NPM**: [class-transformer](https://www.npmjs.com/package/class-transformer)
- **文档**: [class-transformer GitHub](https://github.com/typestack/class-transformer)
- **简介**: 用于对象与类实例之间的转换，通常与 `class-validator` 配合使用。
- **使用场景**: 对象转换和序列化。
- **代码示例**:

```ts
import { plainToClass } from 'class-transformer';

const user = plainToClass(User, {
  name: 'John Doe',
  email: 'john.doe@example.com'
});
```

### cache-manager

- **NPM**: [cache-manager](https://www.npmjs.com/package/cache-manager)
- **文档**: [cache-manager GitHub](https://github.com/BryanDonovan/node-cache-manager)
- **简介**: 一个灵活、可扩展的缓存模块，支持多种存储方式。
- **使用场景**: 数据缓存，如 API 响应、数据库查询结果等。
- **代码示例**:

```ts
import * as cacheManager from 'cache-manager';

const memoryCache = cacheManager.caching({ store: 'memory', max: 100, ttl: 10 });

async function getUser(id: string) {
  const cachedUser = await memoryCache.get(id);
  if (cachedUser) {
    return cachedUser;
  }

  const user = await fetchUserFromDb(id);
  await memoryCache.set(id, user);
  return user;
}
```

### hashids

- **NPM**: [hashids](https://www.npmjs.com/package/hashids)
- **文档**: [Sqids JavaScript (formerly Hashids)](https://sqids.org/javascript?hashids)
- **简介**: 用于生成短的、唯一的非整数 ID 的库。
- **使用场景**: 生成短链接、唯一标识符等。
- **代码示例**:

```ts
import Hashids from 'hashids';

const hashids = new Hashids();
const id = hashids.encode(12345); // 输出一个短的唯一字符串
```

### ioredis

- **NPM**: [ioredis](https://www.npmjs.com/package/ioredis)
- **文档**: [ioredis GitHub](https://github.com/luin/ioredis)
- **简介**: 一个健全、高效的 Redis 客户端。
- **使用场景**: Redis 数据库操作、缓存管理等。
- **代码示例**:

```ts
import Redis from 'ioredis';

const redis = new Redis();
redis.set('key', 'value');
```

### mongoose

- **NPM**: [mongoose](https://www.npmjs.com/package/mongoose)
- **文档**: [Mongoose Documentation](https://mongoosejs.com/)
- **简介**: 用于 MongoDB 和 Node.js 的对象数据模型（ODM）库。
- **使用场景**: MongoDB 数据库操作、数据模型定义等。
- **代码示例**:

```ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);
```

### nestgram

- **NPM**: [nestgram](https://www.npmjs.com/package/nestgram)
- **文档**: [About Nestgram - Nestgram](https://degreetpro.gitbook.io/nestgram/)
- **简介**: 一个用于 NestJS 的 Telegram 机器人库。
- **使用场景**: 在 NestJS 应用中集成 Telegram 机器人。
- **代码示例**:

```ts
import { Nestgram } from 'nestgram';

const nestgram = new Nestgram({ token: 'YOUR_BOT_TOKEN' });
nestgram.on('message', (msg) => {
  // 处理消息
});
```

### nestjs-throttler-storage-redis

- **NPM**: [nestjs-throttler-storage-redis](https://www.npmjs.com/package/nestjs-throttler-storage-redis)
- **文档**: [GitHub - nestjs-throttler-storage-redis](https://github.com/kkoomen/nestjs-throttler-storage-redis#readme)
- **简介**: 用于将 NestJS 的 Throttler 模块与 Redis 集成。
- **使用场景**: 在 NestJS 应用中实现基于 Redis 的请求限制。
- **代码示例**:

```ts
import { ThrottlerModule } from '@nestjs/throttler';
import { RedisThrottlerStorage } from 'nestjs-throttler-storage-redis';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      storage: new RedisThrottlerStorage(),
    }),
  ],
})
export class AppModule {}
```

### ramda

- **NPM**: [ramda](https://www.npmjs.com/package/ramda)
- **文档**: [Ramda Documentation](https://ramdajs.com/)
- **简介**: 一个实用的函数式编程库。
- **使用场景**: 数据转换、函数组合等。
- **代码示例**:

```ts
import * as R from 'ramda';

const addOne = R.add(1);
const result = addOne(2); // 输出 3
```

### redis

- **NPM**: [redis](https://www.npmjs.com/package/redis)
- **文档**: [redis GitHub](https://github.com/NodeRedis/node-redis)
- **简介**: Node.js 的 Redis 客户端。
- **使用场景**: 在 Node.js 应用中与 Redis 数据库进行交互。
- **代码示例**:

```ts
import * as redis from 'redis';
const client = redis.createClient();

client.set('key', 'value');
client.get('key', (err, reply) => {
  console.log(reply); // 输出 'value'
});
```

### reflect-metadata

- **NPM**: [reflect-metadata](https://www.npmjs.com/package/reflect-metadata)
- **文档**: [Metadata Proposal - ECMAScript](https://rbuckton.github.io/reflect-metadata/)
- **简介**: 用于元数据反射 API 的库。
- **使用场景**: 在 TypeScript 中使用装饰器和反射。
- **代码示例**:

```ts
import 'reflect-metadata';

@Reflect.metadata('role', 'admin')
class User {
  constructor(public name: string) {}
}

const metadata = Reflect.getMetadata('role', User);
console.log(metadata); // 输出 'admin'
```

### rxjs

- **NPM**: [rxjs](https://www.npmjs.com/package/rxjs)
- **文档**: [RxJS Documentation](https://rxjs.dev/)
- **简介**: 用于使用可观察对象进行响应式编程的库。
- **使用场景**: 异步编程、事件处理等。
- **代码示例**:

```ts
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

const source$ = of(1, 2, 3);
const result$ = source$.pipe(map(x => x * 2));

result$.subscribe(x => console.log(x)); // 输出 2, 4, 6
```
