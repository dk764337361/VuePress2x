# 习题
## 1. Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。
> webpack是运行在nodejs环境下，配置文件遵循commonjs规范。其配置文件webpack.config.js导出一个object/function/promise/array。 Webpack在启动后，会从entry开始，递归解析entry依赖的所有Module，每找到一个Module，就会根据Module.rules里配置的Loader规则进行相应的转换处理，对Module进行转换后，再解析出当前Module依赖的Module，这些Module会以entry为单位进行分组，即为一个Chunk。因此一个Chunk，就是一个entry及其所有依赖的Module合并的结果。最后Webpack会将所有的Chunk转换成文件输出Output。在整个构建流程中，Webpack会在恰当的时机执行Plugin里定义的逻辑，从而完成Plugin插件的优化任务。其流程如下：
```
1、配置初始化
webpack会首先读取配置文件，执行默认配置

2、编译前准备
webpack 会实例化compiler，注册plugins、resolverFactory、hooks。

3、reslove前准备
webpack 实例化compilation、NormalModuleFactory和ContextModuleFactory

4、reslove流程
解析文件的路径信息以及inline loader和配置的loader合并、排序

5、构建module
runLoaders处理源码，得到一个编译后的字符串或buffer。将文件解析为ast，分析module间的依赖关系，递归解析依赖文件

6、生成chunk
实例化chunk并生成chunk graph，设置module id，chunk id，hash等

7、资源构建
使用不同的template渲染chunk资源

8、文件生成
创建目标文件夹及文件并将资源写入，打印构建信息
```

## 2. Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。

> loader：用于对模块源码的转换，因为webpack本身只支持js处理，loader描述了webpack如何处理非javascript模块，并且在build中引入这些依赖。loader可以将文件从不同css预处理转换为css,将ts转换为JavaScript，或者将内联图像转换为data URL。比如说：sass-loader、css-Loader，style-Loader、file-loader等。

* loader开发:就像开发中间件管道，可以首先新建一个导出模块,入参为source，对source进行一系列处理，然后返回js代码（或跟上别的loader）
    ```js
    module.exports = (source)=>{
        return result(source)
    }
    ```
>plugin：plugin通过webpack钩子机制实现，相比于loader,plugin拥有更宽的能力。其目的在于解决loader无法实现的其他事，从打包优化和压缩，到重新定义环境变量，功能强大到可以用来处理各种各样的任务。 plugin开发：plugin被要求必须是一个函数或者是包含apply方法的对象。入参是一个compiler对象，其包含构建所需信息，开发时可以通过compiler中hooks属性访问到emit钩子，并通过其tap方法注册一个钩子函数，定制钩子名称和挂载函数。该函数入参为compilation打包上下文，通过遍历compilation下assets的所有键得到所有文件名称。然后根据 键 的source（）方法拿到对应的content内容，然后对content进行一些处理，并返回给souce函数，以达到我们的插件目的。
