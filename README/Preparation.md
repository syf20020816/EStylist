# Preparation

如果您想要通过EStylist发送模板给他人，那么你就需要开启SMTP服务，例如:

If you want to send templates to others through EStylist, you need to enable the SMTP service, such as:

- 腾讯企业邮件（QQ 邮箱）：[smtp.qq.com](http://smtp.qq.com)
- 腾讯企业邮件（企业版 QQ 邮箱）：[smtp.exmail.qq.com](http://smtp.exmail.qq.com)
- Gmail：[smtp.gmail.com](http://smtp.gmail.com)
- 雅虎邮箱（Yahoo Mail）：[smtp.mail.yahoo.com](http://smtp.mail.yahoo.com)
- Hotmail/Outlook.com：[smtp.live.com](http://smtp.live.com)
- 新浪邮箱：[smtp.sina.com.cn](http://smtp.sina.com.cn)
- 163 邮箱：[smtp.163.com](http://smtp.163.com)
- 126 邮箱：[smtp.126.com](http://smtp.126.com)
- 搜狐邮箱：[smtp.sohu.com](http://smtp.sohu.com)
- 邮件中国：[smtp.chinaemail.cn](http://smtp.chinaemail.cn)

这些是较为常见的 SMTP 服务提供商，你可以根据自己使用的邮箱服务选择相应的 SMTP 服务器地址。请注意，在使用这些 SMTP 服务器发送邮件之前，你可能需要提供正确的端口号、用户名和密码等认证信息。每个 SMTP 服务器提供商可能有不同的配置要求，请确保按照相应的服务提供商文档进行正确的设置。

These are common SMTP service providers, and you can choose the corresponding SMTP server address based on the email service you use. Please note that before using these SMTP servers to send emails, you may need to provide the correct authentication information such as port number, username, and password. Each SMTP server provider may have different configuration requirements, please ensure that the correct settings are made according to the corresponding service provider documentation.

## Example For QQ

首先，打开QQ邮箱，选择设置

First, open the QQ email and select Settings

![image-20230622231149817](E:\Rust\try\eStylist\README\Preparation\imgs\image-20230622231149817.png)

选择邮箱设置中的账户

Select an account in the email settings

![image-20230622231314194](E:\Rust\try\eStylist\README\Preparation\imgs\image-20230622231314194.png)

找到`POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV`服务，然后开启服务

Find the` POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV `service and start the service

![image-20230622231359770](E:\Rust\try\eStylist\README\Preparation\imgs\image-20230622231359770.png)

选择安全设置，找到`POP3/IMAP/SMTP/Exchange/CardDAV `服务，然后生成授权码

Select security settings, locate the` POP3/IMAP/SMTP/Exchange/CardDAV `service, and generate an authorization code

![image-20230622231506917](E:\Rust\try\eStylist\README\Preparation\imgs\image-20230622231506917.png)

> ❗生成的授权码请妥善保存
>
> ❗Please keep the generated authorization code properly

