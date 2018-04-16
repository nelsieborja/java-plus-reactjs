package launch;

import java.io.File;

import org.apache.catalina.WebResourceRoot;
// import org.apache.catalina.core.StandardContext;
import org.apache.catalina.startup.Tomcat;
import org.apache.catalina.connector.Connector;
import org.apache.catalina.webresources.DirResourceSet;
import org.apache.catalina.webresources.StandardRoot;

import org.apache.catalina.Context;
import org.apache.catalina.WebResourceSet;
import org.apache.catalina.webresources.EmptyResourceSet;

// import java.io.FileReader;

// import javax.script.ScriptEngine;
// import javax.script.ScriptEngineManager;
// import javax.script.ScriptException;

public class Main {

    public static void main(String[] args) throws Exception {

        String webappDirLocation = "src/main/webapp/";
        Tomcat tomcat = new Tomcat();

        //The port that we should run on can be set into an environment variable
        //Look for that variable and default to 8080 if it isn't there.
        String webPort = System.getenv("PORT");
        if (webPort == null || webPort.isEmpty()) {
            webPort = "8080";
        }

        // tomcat.setPort(Integer.valueOf(webPort));

        Connector httpsConnector = new Connector();
        httpsConnector.setProtocol("org.apache.coyote.http11.Http11NioProtocol");
        httpsConnector.setPort(8081);
        httpsConnector.setSecure(true);
        httpsConnector.setScheme("https");
        httpsConnector.setAttribute("keystoreFile", new File(webappDirLocation).getAbsolutePath() + "/cert/keystore");
        httpsConnector.setAttribute("keystorePass", "password");
        // httpsConnector.setAttribute("truststoreFile",
        //         new File(webappDirLocation).getAbsolutePath() + "/cert/server.cer");
        // httpsConnector.setAttribute("truststorePass", "");
        httpsConnector.setAttribute("clientAuth", false);
        httpsConnector.setAttribute("sslProtocol", "TLS");
        httpsConnector.setAttribute("SSLEnabled", true);

        tomcat.setPort(Integer.valueOf(webPort));
        tomcat.getService().addConnector(httpsConnector);

        Connector defaultConnector = tomcat.getConnector();
        defaultConnector.setRedirectPort(8081);

        // StandardContext ctx = (StandardContext) tomcat.addWebapp("", new File(webappDirLocation).getAbsolutePath());
        // System.out.println("configuring app with basedir: " + new File("./" + webappDirLocation).getAbsolutePath());

        // // Declare an alternative location for your "WEB-INF/classes" dir
        // // Servlet 3.0 annotation will work
        // File additionWebInfClasses = new File("target/classes");
        // WebResourceRoot resources = new StandardRoot(ctx);
        // resources.addPreResources(
        //         new DirResourceSet(resources, "/WEB-INF/classes", additionWebInfClasses.getAbsolutePath(), "/"));
        // ctx.setResources(resources);

        // Define a web application context.
        Context context = tomcat.addWebapp("", new File(webappDirLocation).getAbsolutePath());

        // Declare an alternative location for your "WEB-INF/classes" dir
        // Servlet 3.0 annotation will work
        File additionWebInfClassesFolder = new File("target/classes");
        WebResourceRoot resources = new StandardRoot(context);

        WebResourceSet resourceSet;
        if (additionWebInfClassesFolder.exists()) {
            resourceSet = new DirResourceSet(resources, "/WEB-INF/classes",
                    additionWebInfClassesFolder.getAbsolutePath(), "/");
            System.out.println(
                    "loading WEB-INF resources from as '" + additionWebInfClassesFolder.getAbsolutePath() + "'");
        } else {
            resourceSet = new EmptyResourceSet(resources);
        }

        resources.addPreResources(resourceSet);
        context.setResources(resources);

        tomcat.start();
        tomcat.getServer().await();

        // Server-rendering with Nashorn
        // ScriptEngine nashorn = new ScriptEngineManager().getEngineByName("nashorn");
        // nashorn.eval(new FileReader(webappDirLocation + "public/bundle.js"));
        // String markup = nashorn.invokeFunction("renderOnServer");
        // Then Pass markup as Java variable
    }
}